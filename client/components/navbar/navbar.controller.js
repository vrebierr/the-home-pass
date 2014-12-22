'use strict';

angular.module('theHomePassApp')
    .controller('NavbarCtrl', function ($scope, $rootScope, Auth, $state, $modal, Restangular) {
        $scope.Auth = Auth;
        $scope.isCollapsed = true;
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.currentUser = Auth.getCurrentUser();
        $scope.user = {};

        if ($scope.currentUser.role === 'user') {
            console.log(moment())
            var expire = moment($scope.currentUser.createdAt) - moment().add('y', 1);
            $scope.expire = expire;
        }

        $scope.login = function () {
            $scope.Auth.loginModal();
        };

        $scope.registerModal = function () {
            $scope.modal = $modal.open({
                templateUrl: 'registerModal.html',
                scope: $scope,
                windowClass: '',
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
        };

        $scope.logout = function() {
            Auth.logout();
        };
    });
