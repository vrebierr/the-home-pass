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
                    ads : function (Restangular, Auth) {
                        var likes = Auth.getCurrentUser().likes;
                        console.log(Auth.getCurrentUser())
                        console.log(likes)
                        if (likes) {
                            return Restangular.all('items').getList(likes);
                        }
                        else {
                            return [];
                        }
                    }
                }
            });
    });
