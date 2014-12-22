'use strict';

angular.module('theHomePassApp')
    .controller('LikeCtrl', function ($scope, ads, pos, Restangular, $http) {
        Restangular.all('users').one('me').get().then(function (res) {
            $scope.currentUser = res;

            $scope.likes = _.map($scope.currentUser.likes, function (item) {
                item.ad = _.findWhere(ads, {_id: item.ad});
                item.pos = _.findWhere(pos, {_id: item.pos});
                return item;
            });
        });

        $scope.delete = function (like) {
            $http.delete('/api/users/like', like.ad._id).then(function () {
                $scope.likes = _.without($scope.likes, like);
                Auth.refresh();
            });
        };

        $scope.print = function () {

        };
    });
