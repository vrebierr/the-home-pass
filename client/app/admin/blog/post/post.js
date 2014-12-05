'use strict';

angular.module('theHomePassApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('post', {
        url: '/admin/post',
        templateUrl: 'app/admin/blog/post/post.html',
        controller: 'PostCtrl'
      });
  });