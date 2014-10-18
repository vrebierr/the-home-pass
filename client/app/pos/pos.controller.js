'use strict';

angular.module('theHomePassApp')
	.controller('PosCtrl', function ($scope, pos, Restangular, FileUploader) {
		$scope.pos = pos;
        $scope.markers = [];
        $scope.marker = new google.maps.Marker();
        $scope.selected = {
            type: 'euro'
        };
        $scope.uploader = new FileUploader({
            url: '/api/ad/image'
        });
        $scope.uploader.filters.push({
            name: 'imageFilter',
            fn: function(item, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        $scope.resetMarkers = function () {
            $scope.marker.setMap(null);
            for (var i = 0; i < $scope.markers.length; i++) {
                $scope.markers[i].setIcon(null);
            }
        };

        $scope.uploader.onAfterAddingFile = function(fileItem) {
            $scope.uploader.uploadAll();
        };

        var baseAds = Restangular.all('ads');
        $scope.send = function (form) {
            console.log(form);
            if (form.$valid) {
                if ($scope.ad._id) {
                    $scope.ad.put();
                }
                else {
                    baseAds.post($scope.ad).then(function (ad) {
                        $scope.marker.setMap(null);
                        var marker = new google.maps.Marker({
                            position: new google.maps.LatLng(ad.lat, ad.lng),
                            map: map,
                        });

                        $scope.markers.push(marker);

                        google.maps.event.addListener(marker, 'click', function (event) {
                            $scope.marker.setMap(null);
                            for (var i = 0; i < $scope.markers.length; i++) {
                                $scope.markers[i].setIcon(null);
                            }
                            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
                            $scope.ad = ad;
                            $scope.$apply();
                        });
                    });
                }
            }
        };

        var map;
        var geocoder = new google.maps.Geocoder();
        $scope.initialize = function () {
            var mapOptions = {
                zoom: 12,
                center: new google.maps.LatLng(48.89670230000001, 2.3183781999999997)
            };
            map = new google.maps.Map(document.getElementById('map'), mapOptions);

            // search bar
            var input = document.getElementById('search');
            var search = new google.maps.places.SearchBox(input);

            _.forEach(pos, function (ad) {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(ad.lat, ad.lng),
                    map: map,
                });

                google.maps.event.addListener(marker, 'click', function (event) {
                    $scope.resetMarkers();

                    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
                    $scope.ad = ad;
                    $scope.$apply();
                });
                $scope.markers.push(marker);
            });

            google.maps.event.addListener(search, 'places_changed', function () {
                var place = search.getPlaces()[0];

                if (place === undefined)
                    return;

                $scope.resetMarkers();

                $scope.marker = new google.maps.Marker({
                    position: place.geometry.location,
                    map: map,
                    title: place.name,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                });
                map.setCenter(place.geometry.location);
                $scope.ad = {
                    address: place.formatted_address,
                    lat: place.geometry.location.k,
                    lng: place.geometry.location.B
                };
                $scope.$apply();
            });

            google.maps.event.addListener(map, 'click', function (event) {
                geocoder.geocode({latLng: event.latLng}, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            $scope.resetMarkers();

                            $scope.marker = new google.maps.Marker({
                                position: event.latLng,
                                map: map,
                                title: results[0].formatted_address,
                                icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                            });

                            $scope.selected = {
                                address: results[0].formatted_address,
                                lat: event.latLng.k,
                                lng: event.latLng.B
                            };
                            $scope.$apply();
                        }
                    }
                });
            });
        };

        google.maps.event.addDomListener(window, 'load', $scope.initialize());
	});
