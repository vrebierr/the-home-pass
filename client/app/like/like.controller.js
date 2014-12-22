'use strict';

angular.module('theHomePassApp')
    .controller('LikeCtrl', function ($scope, Restangular, $http, Auth) {
        Restangular.all('items').getList().then(function (ads) {
            Restangular.all('pos').getList().then(function (pos) {
                console.log(Auth.getCurrentUser())
                var likes = _.map(Auth.getCurrentUser().likes, function (item) {
                    console.log(item)
                    item.ad = _.findWhere(ads, {_id: item.ad});
                    item.pos = _.findWhere(pos, {_id: item.pos});
                    return item;
                });
                console.log(likes)
                $scope.likes = likes;
            });
        });

        Restangular.all('users').one('me').get().then(function (res) {
            console.log(res);
        });

        $scope.delete = function (like) {
            console.log(like)
            $http.delete('/api/users/like', like.ad._id).then(function () {
                $scope.likes = _.without($scope.likes, like);
                Auth.refresh();
            }).catch(function (err) {

            });
        };

        $scope.print = function () {

        };
    });
