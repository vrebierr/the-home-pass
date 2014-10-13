'use strict';

angular.module('theHomePassApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ad', {
        url: '/admin/ad',
        templateUrl: 'app/admin/ad/ad.html',
        controller: 'AdCtrl',
        resolve : {
        	ads: function (Restangular) {
        		return Restangular.all('ads').getList();
        	}
        }
      });
  });