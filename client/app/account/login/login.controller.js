'use strict';

angular.module('theHomePassApp')
    .controller('LoginCtrl', function ($scope, Auth, $state) {
        $scope.user = {};
        $scope.errors = {};

        $scope.login = function(form) {
            if(form.$valid) {
                Auth.pass({
                    pass: $scope.user.pass
                })
                .then(function() {
                    $state.go('main');
                    angular.element('body').removeClass('bg');
                })
                .catch(function() {
                    $scope.error = true;
                });
            }
        };
        $(document).foundation();
        $('#loginModal').foundation('reveal', 'open');
        angular.element('body').addClass('bg');
    });
