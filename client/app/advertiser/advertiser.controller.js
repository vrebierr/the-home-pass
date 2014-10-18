'use strict';

angular.module('theHomePassApp')
    .controller('AdvertiserCtrl', function ($scope, ads, FileUploader) {
        $scope.ads = ads;
        $scope.marker = new google.maps.Marker();
        $scope.ad = {};
        $scope.uploader = new FileUploader({
            url: '/api/ad/image'
        });
        $scope.uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        $scope.uploader.onAfterAddingFile = function(fileItem) {
            $scope.uploader.uploadAll();
        };

        $scope.send = function () {

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

                $scope.ad.address = place.formatted_address;
                $scope.$apply();
            });

            google.maps.event.addListener(map, 'click', function (event) {
                geocoder.geocode({latLng: event.latLng}, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            $scope.marker.setMap(null);
                            $scope.marker = new google.maps.Marker({
                                position: event.latLng,
                                map: map,
                                title: results[0].formatted_address,
                                icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                            });

                            $scope.ad.address = results[0].formatted_address;
                            $scope.$apply();
                        }
                    }
                });
            });
        };

        google.maps.event.addDomListener(window, 'load', $scope.initialize());
    });
