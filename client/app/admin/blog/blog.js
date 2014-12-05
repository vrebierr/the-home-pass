'use strict';

angular.module('theHomePassApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('blog', {
        url: '/admin/blog',
        templateUrl: 'app/admin/blog/blog.html',
        controller: 'BlogCtrl'
      });
  });