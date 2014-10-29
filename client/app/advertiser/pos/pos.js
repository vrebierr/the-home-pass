'use strict';

angular.module('theHomePassApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('pos', {
        url: '/advertiser/pos',
        templateUrl: 'app/advertiser/pos/pos.html',
        controller: 'PosCtrl',
        resolve: {
        	pos: function (Restangular) {
        		return Restangular.all('pos').getList();
        	}
        }
      });
  });
