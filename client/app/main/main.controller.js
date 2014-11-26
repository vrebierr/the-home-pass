'use strict';

angular.module('theHomePassApp')
    .controller('MainCtrl', function ($scope, $rootScope, pos, ads, categories, Auth, $http, uploads, uiGmapGoogleMapApi) {
    	$scope.pos = _.map(pos, function (item) {
            item.image = _.findWhere(uploads, {_id: item.image});
            return item;
        });

        $scope.ads = ads;
        $scope.categories = categories;
        $scope.selected = {};
        $scope.range = 0;

        uiGmapGoogleMapApi.then(function (maps) {
            $scope.map = {
                center: {
                    latitude: Auth.getCurrentUser().from.latitude,
                    longitude: Auth.getCurrentUser().from.longitude
                },
                zoom: 13,
                options: {
                    scrollwheel: true,
                    zoomControl: true
                }
            };

            _.forEach($scope.pos, function (item) {
                item.icon = '/assets/images/marker.png';
                item.show = false;
            });

            $scope.events = {
                map: {
                    idle: function (map) {
                        maps.event.trigger(map, 'resize');
                    }
                },
                markers: {
                    click: function (marker, eventName, model) {
                        $scope.ads = _.where(ads, {pos: [model._id]});
                    }
                },
                search: {
                    places_changed: function (search) {
                        var place = search.getPlaces()[0];

                        if (place === undefined)
                            return;

                        if ($scope.current) {
                            $scope.current.setIcon(null);
                        }

                        $scope.coords = {
                            address: place.formatted_address,
                            latitude: place.geometry.location.k,
                            longitude: place.geometry.location.B
                        };

                        $scope.map.center = {
                            latitude: place.geometry.location.k,
                            longitude: place.geometry.location.B
                        };
                    }
                }
            };
        });

        $scope.changeLocation = function () {
            if ($scope.location) {
                $scope.map.center = {
                    latitude: Auth.getCurrentUser().from.latitude,
                    longitude: Auth.getCurrentUser().from.longitude
                };
                $scope.location = !$scope.location;
            }
            else {
                if (Auth.getCurrentUser().to.address) {
                    $scope.map.center = {
                        latitude: Auth.getCurrentUser().to.latitude,
                        longitude: Auth.getCurrentUser().to.longitude
                    };
                    $scope.location = !$scope.location;
                }
                else {
                    $modal.open({
                        templateUrl: 'modal.html',
                        scope: $scope
                    }).result.then(function () {
                        $http.put('/api/users/to', $scope.coords).success(function (res) {
                            Auth.refresh();
                            $scope.location = !$scope.location;
                        });
                    });
                }
            }
        };

        var distance;
        $('#range').ionRangeSlider({
            min: 2,
            max: 50,
            type: 'single',
            step: 2,
            postfix: 'km',
            onChange: function (item) {
                $scope.range = item.fromNumber;

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
    });
