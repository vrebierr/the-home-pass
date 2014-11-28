'use strict';

angular.module('theHomePassApp')
    .controller('AdCtrl', function ($scope, ad, pos, uiGmapGoogleMapApi) {
        $scope.ad = ad;
        $scope.pos = pos;
        console.log(ad)

        console.log(pos)

        uiGmapGoogleMapApi.then(function (maps) {
            $scope.map = {
                center: {
                    latitude: pos.latitude,
                    longitude: pos.longitude
                },
                zoom: 12,
            };
        });
    });
