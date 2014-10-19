'use strict';

angular.module('theHomePassApp')
	.controller('PosCtrl', function ($scope, pos, Restangular, Modal, $rootScope, $upload) {
		$scope.pos = pos;
        $scope.selected = {};

		$scope.onFileSelect = function ($files) {
			$scope.upload = $upload.upload({
				url: 'api/uploads/',
				file: $files[0]
			}).success(function (res) {
				$scope.selected.image = res.path;
				$scope.$apply();
			})
		};

		$scope.clickMarker = function (item) {
			$scope.selected = item;
			$scope.$apply();
		};

        $scope.confirmation = Modal.confirm.delete(function () {
            $scope.selected.remove().then(function () {
                $scope.pos = _.without($scope.pos, $scope.selected);
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
                        $scope.selected = {};
						current.setMap(null);
						$scope.pos.push(res);
                    });
                }
            }
        };

        var geocoder = new google.maps.Geocoder();
		var current = new google.maps.Marker();
        $scope.initialize = function () {
            var mapOptions = {
                zoom: 12,
                center: new google.maps.LatLng(48.89670230000001, 2.3183781999999997)
            };
			$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

            // search bar
            var input = document.getElementById('search');
            var search = new google.maps.places.SearchBox(input);

			$rootScope.$on('selected', function () {
				current.setMap(null);
			});

            google.maps.event.addListener(search, 'places_changed', function () {
                var place = search.getPlaces()[0];

                if (place === undefined)
                    return;

				$rootScope.$emit('selected');

                current = new google.maps.Marker({
                    position: place.geometry.location,
                    map: $scope.map,
                    title: place.name,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                });

                $scope.map.setCenter(place.geometry.location);
                $scope.ad = {
                    address: place.formatted_address,
                    lat: place.geometry.location.k,
                    lng: place.geometry.location.B
                };
                $scope.$apply();
            });

            google.maps.event.addListener($scope.map, 'click', function (event) {
                geocoder.geocode({latLng: event.latLng}, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
							$rootScope.$emit('selected');

							current = new google.maps.Marker({
								position: event.latLng,
								map: $scope.map,
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
