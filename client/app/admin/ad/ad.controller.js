'use strict';

angular.module('theHomePassApp')
	.controller('AdCtrl', function ($scope, ads) {
		$scope.ads = ads;
        $scope.marker = new google.maps.Marker();

    	var map;
    	$scope.initialize = function () {
    		var mapOptions = {
    			zoom: 12,
    			center: new google.maps.LatLng(48.89670230000001, 2.3183781999999997)
    		};
    		map = new google.maps.Map(document.getElementById('map'), mapOptions);

            // search bar
            var input = document.getElementById('search');
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
            var search = new google.maps.places.SearchBox(input);

    		_.forEach(ads, function (ad) {
    			var marker = new google.maps.Marker({
    				position: new google.maps.LatLng(ad.lat, ad.lng),
    				map: map,
    			});
    		});

            google.maps.event.addListener(search, 'places_changed', function () {
                var place = search.getPlaces()[0];

                if (place === undefined)
                    return;

                $scope.marker.setMap(null);
                $scope.marker = new google.maps.Marker({
                    position: place.geometry.location,
                    map: map,
                    title: place.name,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                });
                map.setCenter(place.geometry.location);
            });
    	};

    	google.maps.event.addDomListener(window, 'load', $scope.initialize());
	});