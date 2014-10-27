'use strict';

angular.module('theHomePassApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('categoryAdmin', {
        url: '/admin/categories',
        templateUrl: 'app/admin/category/category.html',
        controller: 'CategoryCtrl',
        resolve: {
            categories : function (Restangular) {
                return Restangular.all('categories').getList();
            }
        }
      });
  });
