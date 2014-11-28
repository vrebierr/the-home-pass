'use strict';

angular.module('theHomePassApp')
    .controller('MainCtrl', function ($scope, $rootScope, pos, ads, categories, Auth, Restangular, $http, uploads, uiGmapGoogleMapApi, $state) {
        $scope.currentUser = Auth.getCurrentUser();
        $scope.ads = [];
        $scope.location = 0;

        $scope.refresh = function () {
            $scope.ads = [];

            $scope.pos = _.filter(pos, function (item) {
                item.image = _.findWhere(uploads, {_id: item.image});
                item.icon = '/assets/images/marker.png';
                item.dist = geolib.getDistance({
                    latitude: item.latitude,
                    longitude: item.longitude
                }, {
                    latitude: $scope.location &&  $scope.currentUser.to.latitude || $scope.currentUser.from.latitude,
                    longitude: $scope.location && $scope.currentUser.to.longitude || $scope.currentUser.from.longitude
                });

                var tmp = _.filter(ads, function (ad) { return _.contains(ad.pos, item._id) });
                var flag = 0;

                _.forEach(ads, function (ad) {
                    if (item.dist < ad.range) {
                        flag = 1;
                    }
                });

                return flag;
            });

            $scope.ads = _.filter(ads, function (item) {
                var tmp = _.filter(ads, function (ad) { return _.contains(ad.pos, item._id) });
                _.forEach(tmp, function (data) {

                })
            });

            console.log(_.pluck($scope.ads, '_id'))
            console.log($scope.ads)
        }
        $scope.refresh();

        $scope.categories = categories;
        $scope.selected = {};
        $scope.range = 0;

        $scope.scroll = function () {
            for (var i = 0; i < 4; i++) {
                var index = $scope.ads.length - 1 + i
                if (ads[index]) {
                    $scope.ads.push(ads[index]);
                }
            }
        };

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
            $scope.refresh();
        };
    });
