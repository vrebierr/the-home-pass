'use strict';

angular.module('theHomePassApp')
.controller('BlogAdminCtrl', function ($scope, posts) {
    $scope.posts = posts;
});
