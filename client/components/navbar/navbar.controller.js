'use strict';

angular.module('theHomePassApp')
    .controller('NavbarCtrl', function ($scope, $rootScope, Auth, $state, $modal, Restangular) {
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
                Restangular.one('users', 'me').get().then(function (user) {
                    if(user.role === 'advertiser') {
                        $state.go('advertiser');
                    }
                    else if (user.role === 'admin') {
                        $state.go('admin');
                    }
                    else {
                        $state.go('main');
                    }
                });
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
                });
            }
        };
    });
