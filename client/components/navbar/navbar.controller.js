'use strict';

angular.module('theHomePassApp')
    .controller('NavbarCtrl', function ($scope, $location, Auth) {
        $scope.menu = [{
            'title': 'Home',
              'link': '/'
        }];

        $scope.Auth = Auth;
        $scope.isCollapsed = true;
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.getCurrentUser = Auth.getCurrentUser;

        $scope.logout = function() {
            Auth.logout();
            $location.path('/login');
        };
    });
