'use strict';

angular.module('theHomePassApp')
    .controller('PostCtrl', function ($scope, post) {
        $scope.post = post;
        console.log(post)
    });
