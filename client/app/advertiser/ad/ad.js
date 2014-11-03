'use strict';

angular.module('theHomePassApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('ad', {
				url: '/advertiser/ad',
				templateUrl: 'app/advertiser/ad/ad.html',
				controller: 'AdvertiserCtrl',
				authenticate: true,
				resolve: {
					ads: function (Restangular) {
						return Restangular.all('ads').getList();
					},
					pos: function (Restangular) {
						return Restangular.all('pos').getList();
					},
					categories: function (Restangular) {
						return Restangular.all('categories').getList();
					}
				}
			});
	});
