'use strict';

angular.module('theHomePassApp')
    .controller('MainCtrl', function ($scope, pos) {
    	$scope.pos = pos;
        $scope.markers = [];

        $scope.resetMarkers = function () {
            _.forEach($scope.markers, function (marker) {
                var icon = L.icon({
                    iconUrl: 'http://localhost:9000/bower_components/leaflet/dist/images/marker-icon.png'
                });
                marker.setIcon(icon);
            })
        };

    	var map = L.map('map').setView([48.89670230000001, 2.3183781999999997], 13);
        L.tileLayer('http://{s}.tiles.mapbox.com/v3/examples.map-i875mjb7/{z}/{x}/{y}.png').addTo(map);

        _.forEach(pos, function(item) {
            var marker = L.marker([item.lat, item.lng]).addTo(map);
            marker.addEventListener('click', function (e) {
                $scope.resetMarkers();
                var icon = L.icon({
                    iconUrl: 'http://maps.gstatic.com/intl/de_de/mapfiles/ms/micons/red-pushpin.png'
                });
                e.target.setIcon(icon);
            });
            $scope.markers.push(marker);
        });
    });
