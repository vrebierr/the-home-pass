'use strict';

angular.module('theHomePassApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'MainCtrl',
                resolve: {
                    pos: function (Restangular) {
                        return Restangular.all('pos').getList();
                    },
                    ads: function (Restangular) {
                        return Restangular.all('ads').getList();
                    },
                    categories: function (Restangular) {
                        return Restangular.all('categories').getList();
                    }
                }
            });
    });
