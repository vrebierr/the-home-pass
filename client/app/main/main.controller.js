'use strict';

angular.module('theHomePassApp')
    .controller('MainCtrl', function ($scope, $rootScope, pos, ads, categories, Auth, Restangular, $http, uploads, uiGmapGoogleMapApi, $state) {
        $scope.currentUser = Auth.getCurrentUser();
        $scope.ads = [];
        $scope.pos = _.filter(pos, function (item) {
            item.image = _.findWhere(uploads, {_id: item.image});
            item.dist = geolib.getDistance({
                latitude: item.latitude,
                longitude: item.longitude
            }, {
                latitude: location && $scope.currentUser.from.latitude || $scope.currentUser.to.latitude,
                longitude: location && $scope.currentUser.from.longitude || $scope.currentUser.to.longitude
            });

            var tmp = _.filter(ads, function (ad) { return _.contains(ad.pos, item._id) });

            var flag = 0;
            console.log(item.dist)
            _.forEach(tmp, function (ad) {
                console.log(ad.range)
                if (item.dist < ad.range) {
                    $scope.ads.push(ad);
                    flag = 1;
                }
            });

            return flag;
        });

        console.log($scope.pos)

        $scope.ads = [
            {image: 'bg.jpg', _id: 1},
            {image: 'bg.jpg', _id: 2},
            {image: 'bg.jpg', _id: 3},
            {image: 'bg.jpg', _id: 4},
            {image: 'bg.jpg', _id: 5},
            {image: 'bg.jpg', _id: 6},
            {image: 'bg.jpg', _id: 7},
            {image: 'bg.jpg', _id: 8},
            {image: 'bg.jpg', _id: 9},
            {image: 'bg.jpg', _id: 10},
            {image: 'bg.jpg', _id: 11},
            {image: 'bg.jpg', _id: 12},
            {image: 'bg.jpg', _id: 13},
            {image: 'bg.jpg', _id: 14},
            {image: 'bg.jpg', _id: 15},
            {image: 'bg.jpg', _id: 16},
            {image: 'bg.jpg', _id: 17},
        ];

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
    });
