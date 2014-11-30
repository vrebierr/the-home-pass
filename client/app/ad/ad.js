'use strict';

angular.module('theHomePassApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('show', {
                url: '/show/:ad/:pos',
                templateUrl: 'app/ad/ad.html',
                controller: 'AdCtrl',
                authenticate: true,
                resolve: {
                    ad: function (Restangular, $stateParams) {
                        return Restangular.one('items', $stateParams.ad).get();
                    },
                    pos: function (Restangular, $stateParams) {
                        return Restangular.one('pos', $stateParams.pos).get();
                    },
                    ads: function (Restangular, $stateParams) {
                        return Restangular.all('items').one('pos', $stateParams.pos).getList();
                    }
                }
            });
    });
