'use strict';

angular.module('theHomePassApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'MainCtrl',
                resolve: {
                    ads: function (Restangular) {
                        return Restangular.all('ads').getList();
                    }
                }
            });
    });