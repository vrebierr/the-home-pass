'use strict';

angular.module('theHomePassApp')
    .controller('AdminUserCtrl', function ($scope, users, $modal, Restangular) {
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

        $scope.create = function () {
            $scope.user = {};
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
