'use strict';

angular.module('theHomePassApp')
    .controller('AdminUserCtrl', function ($scope, users, Modal, Restangular) {
        $scope.users = users;
        $scope.user = {};

        $scope.select = function (user) {
            $scope.selected = user;
        };

        $scope.confirm = Modal.confirm.delete(function () {
            $scope.selected.remove().then(function () {
                $scope.users = _.without($scope.users, $scope.user);
            });
        });

        var baseUser = Restangular.all('users');
        $scope.add = function (form) {
            if (form.$valid) {
                baseUser.post($scope.user).then(function (res) {
                    $scope.user = {};
                    $scope.users.push(res);
                });
            }
        };

        $scope.update = function (form) {
            if (form.$valid) {
                if ($scope.selected._id) {
                    $scope.selected.put();
                }
            }
        }
    });
