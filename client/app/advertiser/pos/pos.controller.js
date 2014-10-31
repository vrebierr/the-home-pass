'use strict';

angular.module('theHomePassApp')
	.controller('PosCtrl', ['$scope', 'pos', 'Restangular', 'Modal', '$rootScope', '$upload', 'GoogleMapApi'.ns(), function ($scope, pos, Restangular, Modal, $rootScope, $upload, GoogleMapApi, IsReady) {
		$scope.pos = pos;
		$scope.selected = {};

		GoogleMapApi.then(function (maps) {
			var geocoder = new maps.Geocoder();
			$scope.map = {
				center: {
					latitude: 48.89670230000001,
					longitude: 2.3183781999999997
				},
				zoom: 8,
			};

			$scope.events = {
				map: {
					click: function (map, eventName, args) {
						geocoder.geocode({latLng: args[0].latLng}, function (results, status) {
							if (status == maps.GeocoderStatus.OK) {
								if (results[0]) {
									if ($scope.current) {
										$scope.current.setIcon(null);
									}

									$scope.selected = {
										latitude: results[0].geometry.location.k,
										longitude: results[0].geometry.location.B,
										address: results[0].formatted_address
									};
									$scope.$apply();
								}
							}
						});
					}
				},
				markers: {
					click: function (marker, eventName, model, args) {
						if ($scope.current) {
							$scope.current.setIcon(null);
						}
						$scope.current = marker;
						$scope.selected = model;
						marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
					}
				},
				search: {
					places_changed: function (search, eventName, c, d) {
						var place = search.getPlaces()[0];

						if (place === undefined)
							return;

						if ($scope.current) {
							$scope.current.setIcon(null);
						}

						$scope.selected.address = place.formatted_address;
						$scope.selected.latitude = place.geometry.location.k;
						$scope.selected.longitude = place.geometry.location.B;

						$scope.map.center = {
							latitude: place.geometry.location.k,
							longitude: place.geometry.location.B
						};
					}
				}
			}
		});

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
				$scope.selected = null;
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
						$scope.pos.push(res);
						$scope.selected = null;
                    });
                }
            }
        };
	}]);
