'use strict';

angular.module('theHomePassApp')
    .controller('UserAdminCtrl', function ($scope, $state, users, $modal, Restangular, uuid4, $rootScope, Auth, uiGmapGoogleMapApi) {
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


        uiGmapGoogleMapApi.then(function (maps) {
            $scope.map = {
                center: {
                    latitude: 48.89670230000001,
                    longitude: 2.3183781999999997
                },
                zoom: 15
            };

            $scope.events = {
                map: {
                    idle: function (map) {
                        maps.event.trigger(map, 'resize');
                    }
                },
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

        $scope.refresh = function () {
            $scope.user.pass = Math.random().toString(36).substr(2, 8);
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
                baseUser.post($scope.user).then(function (data) {
                    $scope.users.push(data);
                    $scope.user = {};
                }).catch(function () {
                    toastr.error('Une erreure s\'est produite.');
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
                controller: 'UserModalCtrl',
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

                    toastr.info('Utilisateur modifié !');
                }).catch(function () {
                    toastr.error('Une erreure s\'est produite.');
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

                    toastr.error('Utilisateur supprimé !');
                }).catch(function () {
                    toastr.error('Une erreure s\'est produite.');
                });
            })
        };

        $scope.impersonate = function (user) {
            Auth.loginAs(user).then(function () {
                $state.go('main');
            });
        };
    });

angular.module('theHomePassApp')
    .controller('UserModalCtrl', function ($scope, $modalInstance, Auth) {
        $scope.create = function (form) {
            if (form.$valid) {
                $scope.user.password = $scope.user.pass;
                users.post($scope.user).then(function (res) {
                    $scope.users.push(res);

                    toastr.success('Utilisateur ajouté !');
                });
            }
        }
    });
