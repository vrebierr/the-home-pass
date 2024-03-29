'use strict';

angular.module('theHomePassApp')
    .controller('AdCtrl', function ($scope, ad, pos, ads, uiGmapGoogleMapApi, Auth, $http, $rootScope) {
        $scope.ad = ad;
        $scope.pos = pos;
        $scope.pos.icon = '/assets/images/marker.png';
        $scope.ads = ads;
        $scope.currentUser = Auth.getCurrentUser();

        $scope.isLiked = function () {
            _.forEach($scope.currentUser.likes, function (item) {
                if (item.ad === ad._id) {
                    $scope.liked = true;
                }
            });
        };

        $scope.isLiked();

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
            if ($scope.liked) {
                $http.delete('/api/users/likes/' + $scope.ad._id).then(function () {
                    $scope.liked = !$scope.liked;
                    $rootScope.$broadcast('like', -1);
                });
            }
            else {
                $http.post('/api/users/likes', {ad: $scope.ad._id, pos: $scope.pos._id}).then(function (likes) {
                    $scope.liked = !$scope.liked;
                    $rootScope.$broadcast('like', 1);
                    $scope.currentUser.likes = likes.data;
                    $scope.$apply();
                });
            }
        };
    });
