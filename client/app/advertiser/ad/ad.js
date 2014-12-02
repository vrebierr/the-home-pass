'use strict';

angular.module('theHomePassApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('ad', {
				url: '/advertiser/ad',
				templateUrl: 'app/advertiser/ad/ad.html',
				controller: 'AdvertiserAdCtrl',
				authenticate: true,
				resolve: {
					ads: function (Restangular) {
						return Restangular.all('items').getList();
					},
					pos: function (Restangular) {
						return Restangular.all('pos').getList();
					},
					categories: function (Restangular) {
						return Restangular.all('categories').getList();
					},
					users: function (Restangular) {
						return Restangular.all('users').getList();
					}
				}
			});
	});
