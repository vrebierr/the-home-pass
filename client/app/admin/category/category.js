'use strict';

angular.module('theHomePassApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('category', {
        url: '/admin/categories',
        templateUrl: 'app/admin/category/category.html',
        controller: 'CategoryCtrl'
      });
  });