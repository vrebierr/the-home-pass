'use strict';

angular.module('theHomePassApp')
    .controller('UserAdminCtrl', ['$scope', '$state', 'users', '$modal', 'Restangular', 'uuid4', '$rootScope', 'Auth', 'GoogleMapApi'.ns(), function ($scope, $state, users, $modal, Restangular, uuid4, $rootScope, Auth, GoogleMapApi) {
        $scope.users = users;
        $scope.user = {};

        $scope.$watch('user.from', function () {
            if ($scope.user.from !== undefined) {
                console.log($scope.user.from);

            }
            else {
                angular.element('#from_input').val(null);
            }
        });

        $scope.$watch('user.to.address', function () {
            if ($scope.user.to) {
                angular.element('#to_input').val($scope.user.to.address);
            }
            else {
                angular.element('#to_input').val(null);
            }
        });


        GoogleMapApi.then(function (maps) {
            $scope.map = {
                center: {
                    latitude: 48.89670230000001,
                    longitude: 2.3183781999999997
                },
                zoom: 15
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

                        console.log($scope.user.from)

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

        $scope.refresh = function () {
            $scope.user.pass = uuid4.generate().split('-')[1];
        };

        $scope.create = function () {
            $scope.user = {};
            $scope.refresh();
            $scope.map.center = {
                latitude: 48.89670230000001,
                longitude: 2.3183781999999997
            };

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
            if ($scope.user.from) {
                $scope.map.center = {
                    latitude: $scope.user.from.latitude,
                    longitude: $scope.user.from.longitude
                };
            }
            else if ($scope.user.to) {
                $scope.map.center = {
                    latitude: $scope.user.to.latitude,
                    longitude: $scope.user.to.longitude
                };
            }
            else {
                $scope.map.center = {
                    latitude: 48.89670230000001,
                    longitude: 2.3183781999999997
                };
            }

            angular.element('#from_input').val($scope.user.from.address);
            angular.element('#to_input').val($scope.user.to.address);

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

        $rootScope.$on('logAs', function (event, data) {
            Auth.loginAs(data).then(function () {
                $state.go('main');
            });
        });
    }]);
