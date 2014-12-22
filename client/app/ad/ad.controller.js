'use strict';

angular.module('theHomePassApp')
    .controller('AdCtrl', function ($scope, ad, pos, ads, uiGmapGoogleMapApi, Auth, $http) {
        $scope.ad = ad;
        $scope.pos = pos;
        $scope.pos.icon = '/assets/images/marker.png';
        $scope.ads = ads;
        $scope.currentUser = Auth.getCurrentUser();
        $scope.liked = _.contains($scope.currentUser.likes, {ad: ad._id});

        uiGmapGoogleMapApi.then(function (maps) {
            $scope.map = {
                center: {
                    latitude: pos.latitude,
                    longitude: pos.longitude
                },
                zoom: 12,
            };
        });

        $scope.print = function () {
            window.print();
        };

        $scope.like = function () {
            var likes = Auth.getCurrentUser().likes;
            if (_.contains(likes, {ad: $scope.ad._id, pos: $scope.pos._id})) {
                $http.delete('/api/users/likes/' + $scope.ad._id).then(function () {
                    Auth.refresh();
                    $scope.liked = !$scope.liked;
                });
            }
            else {
                $http.post('/api/users/likes', {ad: $scope.ad._id, pos: $scope.pos._id}).then(function (likes) {
                    Auth.refresh();
                    $scope.liked = !$scope.liked;
                });
            }
        };
    });
