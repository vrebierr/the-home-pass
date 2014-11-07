'use strict';

angular.module('theHomePassApp')
    .controller('NavbarCtrl', function ($scope, $rootScope, Auth, $state) {
        $scope.menu = [{
            'title': 'Home',
              'link': '/'
        }];

        $scope.Auth = Auth;
        $scope.isCollapsed = true;
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.getCurrentUser = Auth.getCurrentUser;
        $scope.user = {};

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

                });
            }
        };

        $scope.logout = function() {
            Auth.logout();
            $state.go('main');
        };
    });
