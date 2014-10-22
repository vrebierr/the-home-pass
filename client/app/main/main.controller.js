'use strict';

angular.module('theHomePassApp')
    .controller('MainCtrl', function ($scope, pos, ads, categories) {
    	$scope.pos = pos;
        $scope.ads = ads;
        $scope.categories = categories;
        $scope.selected = {};
    	$scope.map = L.map('map').setView([48.89670230000001, 2.3183781999999997], 13);
        L.tileLayer('http://{s}.tiles.mapbox.com/v3/examples.map-i875mjb7/{z}/{x}/{y}.png').addTo($scope.map);

        $scope.clickMarker = function (item) {
            $scope.selected = item;
            $scope.ads = _.where(ads, {pos: [item._id]});
            $scope.$apply();
        };
    });
