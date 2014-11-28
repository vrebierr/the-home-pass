'use strict';

angular.module('theHomePassApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('newsletter', {
				url: '/admin/newsletter',
				templateUrl: 'app/admin/newsletter/newsletter.html',
				controller: 'NewsletterCtrl',
				authenticate: true
			})
			.state('admin', {
				url: '/admin',
				templateUrl: 'app/admin/admin.html',
				controller: 'AdminCtrl',
				authenticate: true
			})
			.state('userAdmin', {
				url: '/admin/user',
				templateUrl: 'app/admin/user/user.html',
				controller: 'UserAdminCtrl',
				authenticate: true,
				resolve: {
					users: function (Restangular) {
						return Restangular.all('users').all('admin').getList();
					}
				}
			})
			.state('categoryAdmin', {
				url: '/admin/categories',
				templateUrl: 'app/admin/category/category.html',
				controller: 'CategoryAdminCtrl',
				authenticate: true,
				resolve: {
					categories : function (Restangular) {
						return Restangular.all('categories').getList();
					}
				}
			})
			.state('adAdmin', {
				url: '/admin/ad',
				templateUrl: 'app/admin/ad/ad.html',
				controller: 'AdAdminCtrl',
				authenticate: true,
				resolve: {
					ads: function (Restangular) {
						return Restangular.all('items').getList();
					},
					categories: function (Restangular) {
						return Restangular.all('categories').getList();
					},
					users: function (Restangular) {
						return Restangular.all('users').all('admin').getList();
					},
				}
			});
	});
