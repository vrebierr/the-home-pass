'use strict';

angular.module('theHomePassApp')
    .controller('AdCtrl', function ($scope, ad, pos, ads, uiGmapGoogleMapApi, Auth) {
        $scope.ad = ad;
        $scope.pos = pos;
        $scope.pos.icon = '/assets/images/marker.png';
        $scope.ads = ads;
        $scope.currentUser = Auth.getCurrentUser();
        console.log($scope.currentUser)

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
    });
