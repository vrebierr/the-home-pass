'use strict';

angular.module('theHomePassApp')
    .controller('MainCtrl', function ($scope, ads) {
    	$scope.ads = ads;

    	var map;
    	$scope.initialize = function () {
    		var mapOptions = {
    			zoom: 12,
    			center: new google.maps.LatLng(48.89670230000001, 2.3183781999999997)
    		};
    		map = new google.maps.Map(document.getElementById('map'), mapOptions);

    		_.forEach(ads, function (ad) {
    			var marker = new google.maps.Marker({
    				position: new google.maps.LatLng(ad.lat, ad.lng),
    				map: map,
    			});
    		});
    	};

    	google.maps.event.addDomListener(window, 'load', $scope.initialize());
    });
