'use strict';

angular.module('theHomePassApp')
    .controller('PostAdminCtrl', function ($scope, post) {
        $scope.post = post;

        $scope.ckeOptions = {
            language: 'fr'
        };
    });
