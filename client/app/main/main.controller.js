'use strict';

angular.module('theHomePassApp')
    .controller('MainCtrl', ['$scope', '$rootScope', 'pos', 'ads', 'categories', 'Auth', 'GoogleMapApi'.ns(), function ($scope, $rootScope, pos, ads, categories, Auth, GoogleMapApi) {
    	$scope.pos = pos;
        $scope.ads = ads;
        $scope.categories = categories;
        $scope.selected = {};
        $scope.range = 0;

        GoogleMapApi.then(function (maps) {
            $scope.map = {
                center: {
                    latitude: Auth.getCurrentUser().from.latitude,
                    longitude: Auth.getCurrentUser().from.longitude
                },
                zoom: 13,
            };

            $scope.events = {
                click: function (marker, eventName, model, args) {
                    $scope.ads = _.where(ads, {pos: [model._id]});
                }
            };
        });

        console.log(Auth.getCurrentUser().from.address)

        $scope.changeLocation = function () {
            if ($scope.location) {
                $scope.map.center = {
                    latitude: Auth.getCurrentUser().from.latitude,
                    longitude: Auth.getCurrentUser().from.longitude
                }
            }
            else {
                $scope.map.center = {
                    latitude: Auth.getCurrentUser().to.latitude,
                    longitude: Auth.getCurrentUser().to.longitude
                }
            }
            $scope.location = !$scope.location;
        }

        var distance;
        $('#range').ionRangeSlider({
            min: 2,
            max: 50,
            type: 'single',
            step: 2,
            postfix: 'km',
            onChange: function (item) {
                $scope.range = item.fromNumber;
                $scope.circle = {
                    stroke: {
                        color: '#ff',
                        weight: 2,
                        opacity: 0.5
                    },
                    fill: {
                        color: '#ff',
                        opacity: 0.25
                    },
                    center: {
                        latitude: coords.latitude,
                        longitude: coords.longitude
                    }
                };

                $scope.pos = _.filter(pos, function (item) {
                    distance = geolib.getDistance({
                        latitude: item.latitude,
                        longitude: item.longitude
                    }, {
                        latitude: Auth.getCurrentUser().from.latitude,
                        longitude: Auth.getCurrentUser().from.longitude
                    });

                    return $scope.range * 1000 - distance >= 0;
                });
                $scope.$apply();
            }
        });
    }]);
