'use strict';

angular.module('theHomePassApp')
    .controller('AdvertiserCtrl', function ($scope, ads, pos, categories, Restangular, Modal, $upload) {
        $scope.ads = ads;
        $scope.ad = {
            type: 'euro'
        };
        $scope.pos = pos;
        $scope.categories = categories;

        $scope.onFileSelect = function ($files) {
            $scope.upload = $upload.upload({
                url: 'api/uploads/',
                file: $files[0]
            }).success(function (res) {
                $scope.ad.image = res.path;
            })
        };

        $scope.confirm = function () {
            Modal.confirm.delete(function () {
                $scope.selected.remove().then(function () {
                    $scope.pos = _.without($scope.pos, $scope.selected);
                });
            });
        };

        var baseAds = Restangular.all('ads');
        $scope.send = function (form) {
            if (form.$valid) {
                if ($scope.ad._id) {
                    $scope.ad.put();
                }
                else {
                    baseAds.post($scope.ad).then(function (ad) {
                        $scope.ads.push(ad);
                        $scope.ad = {
                            type: 'euro'
                        };
                    });
                }
            };
        };

        $scope.markerSelected = function (item) {
            $scope.ad.pos = item._id;
            $scope.$apply();
        };

        $scope.posSelected = function () {
            $scope.ad.pos = $scope.ad.pos.split(',');
            $scope.ad.pos.map(function (item) {
                $scope.$emit('select', item._id);
            });
            $scope.map.setCenter(new google.maps.LatLng(pos.lat, pos.lng));
        };

        $scope.initialize = function () {
            var mapOptions = {
                zoom: 12,
                center: new google.maps.LatLng(48.89670230000001, 2.3183781999999997)
            };
            $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        };

        google.maps.event.addDomListener(window, 'load', $scope.initialize());

        $scope.config = {
            plugins: ['remove_button'],
            labelField: 'name',
            searchField: ['name', 'address'],
            valueField: '_id',
            create: false,
            render: {
                option: function (item) {
                    return '<div><strong>' + item.name + '</strong><br><em>' + item.address + '</em></div>';
                }
            }
        };
    });
