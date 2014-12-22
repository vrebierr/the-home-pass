'use strict';

angular.module('theHomePassApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('like', {
                url: '/favoris',
                templateUrl: 'app/like/like.html',
                controller: 'LikeCtrl',
                authenticated: true,
                resolve: {
                    ads: function (Restangular) {
                        return Restangular.all('items').getList();
                    },
                    pos: function (Restangular) {
                        return Restangular.all('pos').getList();
                    }
                }
            });
    });
