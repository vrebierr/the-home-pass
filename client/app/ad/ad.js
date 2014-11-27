'use strict';

angular.module('theHomePassApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('showAd', {
                url: '/ad/:id',
                templateUrl: 'app/ad/ad.html',
                controller: 'AdCtrl',
                resole: {
                    ad: function (Restangular, $stateParams) {
                        return Restangular.one('ads', $stateParams.id).get();
                    },
                    pos: function (Restangular) {
                        return .one('pos').get();
                    }
                }
        });
    });
