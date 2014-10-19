'use strict';

angular.module('theHomePassApp')
	.controller('PosCtrl', function ($scope, pos, Restangular, FileUploader, Modal) {
		$scope.pos = pos;
        $scope.markers = [];
        $scope.marker = new google.maps.Marker();
        $scope.selected = {};
        $scope.uploader = new FileUploader({
            url: '/api/uploads/',
            autoUpload: true
        });
        $scope.uploader.filters.push({
            name: 'imageFilter',
            fn: function(item, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        $scope.confirmation = Modal.confirm.delete(function () {
            $scope.selected.remove().then(function () {
                $scope.pos = _.without($scope.pos, $scope.selected);
                $scope.marker.setMap(null);
            });
        });

        var basePos = Restangular.all('pos');
        $scope.send = function (form) {
            if (form.$valid) {
                if ($scope.selected._id) {
                    $scope.selected.put();
                }
                else {
                    basePos.post($scope.selected).then(function (res) {
                        $scope.resetMarkers();
                        var marker = new google.maps.Marker({
                            position: new google.maps.LatLng(res.lat, res.lng),
                            map: map,
                        });

                        google.maps.event.addListener(marker, 'click', function (event) {
                            $scope.resetMarkers();
                            $scope.marker = marker;
                            $scope.marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');

                            $scope.selected = res;
                            $scope.$apply();
                        });

                        console.log(res);
                        $scope.markers.push(marker);
                    });
                }
            }
        };

        var current = new google.maps.Marker();
        $scope.resetMarkers = function () {
            $scope.marker.setIcon(null);
            current.setMap(null);
            for (var i = 0; i < $scope.markers.length; i++) {
                $scope.markers[i].setIcon(null);
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

            _.forEach(pos, function (item) {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(item.lat, item.lng),
                    map: map,
                });

                google.maps.event.addListener(marker, 'click', function (event) {
                    $scope.resetMarkers();
                    $scope.marker = marker;
                    $scope.marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');

                    $scope.selected = item;
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

                            current = new google.maps.Marker({
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
