'use strict';

angular.module('theHomePassApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('pos', {
        url: '/pos',
        templateUrl: 'app/pos/pos.html',
        controller: 'PosCtrl'
      });
  });