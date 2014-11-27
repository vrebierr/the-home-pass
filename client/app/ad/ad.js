'use strict';

angular.module('theHomePassApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('showAd', {
                url: '/ad/:id',
                templateUrl: 'app/ad/ad.html',
                controller: 'AdCtrl',
                authenticate: true,
                resolve: {
                    ad: function (Restangular, $stateParams) {
                        return Restangular;
                    },
                    pos: function (Restangular, $stateProvider) {
                        return Restangular;
                    }
                }
            });
    });
