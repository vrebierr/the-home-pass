'use strict';

angular.module('theHomePassApp')
    .controller('UserAdminCtrl', ['$scope', 'users', '$modal', 'Restangular', 'uuid4', '$rootScope', 'GoogleMapApi'.ns(), function ($scope, users, $modal, Restangular, uuid4, $rootScope, GoogleMapApi) {
        $scope.users = users;
        $scope.user = {};

        GoogleMapApi.then(function (maps) {
            $scope.map = {
                center: {
                    latitude: 48.89670230000001,
                    longitude: 2.3183781999999997
                },
                zoom: 8,
            };

            $scope.events = {
                from: {
                    places_changed: function (search, eventName) {
                        var place = search.getPlaces()[0];

                        if (place === undefined)
                            return;

                        $scope.user.from = {
                            address: place.formatted_address,
                            latitude: place.geometry.location.k,
                            longitude: place.geometry.location.B
                        };

                        $scope.map.center = {
                            latitude: place.geometry.location.k,
                            longitude: place.geometry.location.B
                        };
                    }
                },
                to: {
                    places_changed: function (search, eventName) {
                        var place = search.getPlaces()[0];

                        if (place === undefined)
                            return;

                        $scope.user.to = {
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

        $scope.geoSearch = function () {
            $scope.map.center.lat = $scope.user.lat;
            $scope.map.center.lng = $scope.user.lng;
            $scope.$apply();
        };

        $scope.refresh = function () {
            $scope.user.pass = uuid4.generate().split('-')[1];
        };

        $scope.create = function () {
            $scope.user = {};
            $scope.refresh();
            $modal.open({
                templateUrl: 'modal.html',
                scope: $scope
            }).result.then(function () {
                $scope.user.password = $scope.user.pass;
                users.post($scope.user).then(function (res) {
                    $scope.users.push(res);
                });
            });
        };

        $scope.update = function (user) {
            $scope.user = Restangular.copy(user);
            $scope.map.center.lat = user.lat;
            $scope.map.center.lng = user.lng;
            $modal.open({
                templateUrl: 'modal.html',
                scope: $scope
            }).result.then(function () {
                $scope.user.put().then(function (res) {
                    $scope.users = _.map($scope.users, function (item) {
                        if (item._id === res._id) {
                            return res;
                        }
                        else {
                            return item;
                        }
                    });
                });
            });
        };

        $scope.confirm = function (user) {
            $scope.user = user;
            $modal.open({
                templateUrl: 'confirm.html',
                scope: $scope
            }).result.then(function () {
                user.remove().then(function () {
                    $scope.users = _.without($scope.users, user);
                });
            })
        };

        $rootScope.$on('update', function (event, data) {
            $scope.update(data);
        });

        $rootScope.$on('delete', function (event, data) {
            $scope.confirm(data);
        });
    }]);
