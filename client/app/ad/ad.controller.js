'use strict';

angular.module('theHomePassApp')
    .controller('AdCtrl', function ($scope, ad, pos, ads, uiGmapGoogleMapApi, Auth, $http) {
        $scope.ad = ad;
        $scope.pos = pos;
        $scope.pos.icon = '/assets/images/marker.png';
        $scope.ads = ads;
        $scope.currentUser = Auth.getCurrentUser();
        $scope.liked = _.contains($scope.currentUser.likes, ad._id);

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
            if (_.contains(likes, $scope.ad._id)) {
                likes = _.without(likes, $scope.ad._id);
            }
            else {
                likes.push($scope.ad._id);
            }

            $http.put('/api/users/like', likes).then(function (likes) {
                Auth.refresh();
                $scope.liked = !$scope.liked;
            }).catch(function (err) {

            });
        };
    });
