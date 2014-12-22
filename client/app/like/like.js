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
                    likes: function (Restangular, Auth) {
                        Restangular.all('items').getList().then(function (ads) {
                            Restangular.all('pos').getList().then(function (pos) {
                                var likes = _.map(Auth.getCurrentUser().likes, function (item) {
                                    item.ad = _.findWhere(ads, {_id: item.ad});
                                    item.pos = _.findWhere(pos, {_id: item.pos});
                                    return item;
                                });

                                return likes;
                            });
                        });
                    }
                }
            });
    });
