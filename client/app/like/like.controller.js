'use strict';

angular.module('theHomePassApp')
    .controller('LikeCtrl', function ($scope, ads, $http) {
        $scope.ads = ads;

        $scope.delete = function (ad) {
            var ads = _.pluck(_.without($scope.ads, ad), '_id');

            $http.put('/api/users/like', ads).then(function (likes) {
                $scope.ads = _.without($scope.ads, ad);
            }).catch(function (err) {

            });
        };

        $scope.print = function () {

        };
    });
