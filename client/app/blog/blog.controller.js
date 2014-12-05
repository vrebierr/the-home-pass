'use strict';

angular.module('theHomePassApp')
    .controller('BlogCtrl', function ($scope, posts, tags) {
        $scope.posts = posts;
        $scope.tags = tags;
    });
