'use strict';

angular.module('theHomePassApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('userAdmin', {
        url: '/admin/user',
        templateUrl: 'app/admin/user/user.html',
        controller: 'AdminUserCtrl',
        resolve: {
            users: function (Restangular) {
                return Restangular.all('users').all('admin').getList();
            }
        }
      });
  });
