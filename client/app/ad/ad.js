'use strict';

angular.module('theHomePassApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('ad', {
				url: '/ad',
				templateUrl: 'app/ad/ad.html',
				controller: 'AdvertiserCtrl',
				resolve: {
					ads: function (Restangular) {
						return Restangular.all('ads').getList();
					},
					pos: function (Restangular) {
						return Restangular.all('pos').getList();
					}
				}
			});
	});
