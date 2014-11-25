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

        $scope.loginModal = function () {
            $scope.modal = $modal.open({
                templateUrl: 'loginModal.html',
                scope: $scope,
                windowClass: 'tiny',
                controller: 'loginModalCtrl'
            }).result.then(function () {
                $state.go('main');
            });
        }

        $scope.logout = function() {
            Auth.logout();
        };
    });

angular.module('theHomePassApp')
    .controller('loginModalCtrl', function ($scope, $modalInstance, Auth) {
        $scope.login = function(form) {
            if(form.$valid) {
                Auth.login({
                    email: $scope.user.email,
                    password: $scope.user.password
                })
                .then(function() {
                    $modalInstance.close(form);
                })
                .catch(function() {

                });
            }
        };
    });
