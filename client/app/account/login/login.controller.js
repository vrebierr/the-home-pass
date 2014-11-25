'use strict';

angular.module('theHomePassApp')
    .controller('LoginCtrl', function ($scope, Auth, $state, $rootScope) {
        $scope.user = {};
        $scope.errors = {};

        $scope.login = function(form) {
            if(form.$valid) {
                Auth.pass({
                    pass: $scope.user.pass
                })
                .then(function() {
                    $state.go('main');
                })
                .catch(function() {
                    $scope.error = true;
                });
            }
        };

        angular.element('body').addClass('bg');

        $rootScope.$on('$stateChangeStart', function () {
            angular.element('body').removeClass('bg');
        });
    });
