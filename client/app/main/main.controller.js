'use strict';

angular.module('theHomePassApp')
    .controller('MainCtrl', function ($scope, pos, ads, categories) {
    	$scope.pos = pos;
        $scope.ads = ads;
        $scope.categories = categories;
        $scope.selected = {};

        $scope.initialize = function () {
            var mapOptions = {
                zoom: 12,
                center: new google.maps.LatLng(48.89670230000001, 2.3183781999999997)
            };
            $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        };

        google.maps.event.addDomListener(window, 'load', $scope.initialize());

        $scope.clickMarker = function (item) {
            $scope.selected = item;
            $scope.ads = _.where(ads, {pos: [item._id]});
            $scope.$apply();
        };
    });
