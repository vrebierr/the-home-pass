'use strict';

angular.module('theHomePassApp')
    .controller('BlogCtrl', function ($scope, posts) {
        $scope.posts = posts;
    });
