'use strict';

angular.module('theHomePassApp')
    .controller('UserAdminCtrl', function ($scope, users, $modal, Restangular, uuid4) {
        $scope.users = users;
        $scope.user = {};

        $scope.map = {
            center: {
                lat: 48.89670230000001,
                lng: 2.3183781999999997,
                zoom: 13
            },
            defaults: {
                tileLayer: 'http://{s}.tiles.mapbox.com/v3/examples.map-i875mjb7/{z}/{x}/{y}.png'
            }
        }

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


    });
