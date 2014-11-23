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
                    $state.go('main');
                })
                .catch(function() {

                });
            }
        };

        $scope.loginModal = function () {
            $modal.open({
                templateUrl: 'loginModal.html',
                scope: $scope
            }).result.then(function () {
                $http.put('/api/users/to', $scope.coords).success(function (res) {
                    Auth.refresh();
                    $scope.location = !$scope.location;
                });
            });
        }

        $scope.logout = function() {
            Auth.logout();
        };
    });
