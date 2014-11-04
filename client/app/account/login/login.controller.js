'use strict';

angular.module('theHomePassApp')
    .controller('LoginCtrl', function ($scope, Auth, $location) {
        $scope.user = {};
        $scope.errors = {};

        $scope.login = function(form) {
            if(form.$valid) {
                Auth.pass({
                    pass: $scope.user.pass
                })
                .then(function() {
                    // Logged in, redirect to home
                    $location.path('/');
                })
                .catch(function() {
                    $scope.error = true;
                });
            }
        };

    });
