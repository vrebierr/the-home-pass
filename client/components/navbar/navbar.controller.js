'use strict';

angular.module('theHomePassApp')
    .controller('NavbarCtrl', function ($scope, $rootScope, Auth, $state, $modal) {
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
                    console.log($modal);
                    $modal.close('asd');
                })
                .catch(function() {

                });
            }
        };

        $scope.loginModal = function () {
            $modal.open({
                templateUrl: 'loginModal.html',
                scope: $scope,
                windowClass: 'tiny'
            }).result.then(function () {
                $state.go('main');
            });
        }

        $scope.logout = function() {
            Auth.logout();
        };
    });
