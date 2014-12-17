'use strict';

angular.module('theHomePassApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('like', {
                url: '/favoris',
                templateUrl: 'app/like/like.html',
                controller: 'LikeCtrl'
            });
    });
