'use strict';

angular.module('theHomePassApp')
    .controller('AdminUserCtrl', function ($scope, users, Modal, Restangular) {
        $scope.users = users;
        $scope.user = {};
        $scope.map = L.map('map').setView([48.89670230000001, 2.3183781999999997], 13);
        L.tileLayer('http://{s}.tiles.mapbox.com/v3/examples.map-i875mjb7/{z}/{x}/{y}.png').addTo($scope.map);

        $scope.generatePass = function () {

        };

        $scope.select = function (user) {
            $scope.selected = user;
        };

        $scope.confirm = Modal.confirm.delete(function () {
            $scope.selected.remove().then(function () {
                $scope.users = _.without($scope.users, $scope.user);
                $scope.selected = {};
            });
        });

        var baseUser = Restangular.all('users').all('admin');
        $scope.add = function (form) {
            if (form.$valid) {
                baseUser.post($scope.user).then(function (res) {
                    $scope.user = {};
                    $scope.users.push(res);
                });
            }
        };

        $scope.update = function (form) {
            if (form.$valid) {
                if ($scope.selected._id) {
                    $scope.selected.put();
                }
            }
        };

        $scope.initialize = function () {
            var geocoder = new google.maps.Geocoder();
            var input = document.getElementById('search');
            var search = new google.maps.places.SearchBox(input);

            google.maps.event.addListener(search, 'places_changed', function () {
                var place = search.getPlaces()[0];

                if (place === undefined)
                    return;

                $scope.user = {
                    address: place.formatted_address,
                    lat: place.geometry.location.k,
                    lng: place.geometry.location.B
                };

                $scope.map.panTo(new L.LatLng($scope.user.lat, $scope.user.lng));
                var marker = L.marker(new L.LatLng($scope.user.lat, $scope.user.lng)).addTo($scope.map);
                marker.on('click', function (e) {

                });

                $scope.$apply();
            });
        };

        google.maps.event.addDomListener(window, 'load', $scope.initialize());
    });