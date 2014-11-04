'use strict';

angular.module('theHomePassApp')
    .controller('LoginAdvertiserCtrl', function ($scope, Auth, $state) {
        $scope.user = {};
        $scope.errors = {};

        $scope.login = function(form) {
            if(form.$valid) {
                Auth.login({
                    email: $scope.user.email,
                    password: $scope.user.password
                })
                .then(function() {
                    $state.go('main');
                })
                .catch(function() {
                    $scope.error = true;
                });
            }
        };
    });
