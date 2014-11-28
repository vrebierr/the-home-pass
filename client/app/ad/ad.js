'use strict';

angular.module('theHomePassApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('showAd', {
                url: '/show/:ad/:pos',
                templateUrl: 'app/ad/ad.html',
                controller: 'AdCtrl',
                authenticate: true,
                resolve: {
                    ad: function (Restangular, $stateParams) {
                        return Restangular.one('ads', $stateParams.ad).get();
                    },
                    pos: function (Restangular, $stateParams) {
                        return Restangular.one('pos', $stateParams.pos).get();
                    }
                }
            });
    });
