'use strict';

angular.module('theHomePassApp')
    .controller('TagCtrl', function ($scope, tag, posts) {
        $scope.tag = tag;
        $scope.posts = posts;
    });
