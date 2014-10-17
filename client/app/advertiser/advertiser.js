'use strict';

angular.module('theHomePassApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('advertiser', {
				url: '/advertiser',
				templateUrl: 'app/advertiser/advertiser.html',
				controller: 'AdvertiserCtrl',
				resolve: {
					ads: function (Restangular) {
						return Restangular.all('ads').getList();
					}
				}
			});
	});