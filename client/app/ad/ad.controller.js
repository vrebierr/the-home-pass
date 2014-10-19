'use strict';

angular.module('theHomePassApp')
    .controller('AdvertiserCtrl', function ($scope, ads, pos, Restangular, $modal, $upload) {
        $scope.ads = ads;
        $scope.ad = {};
        $scope.pos = pos;

        $scope.onFileSelect = function ($files) {
            $scope.upload = $upload.upload({
                url: 'api/uploads/',
                file: $files[0]
            }).success(function (res) {
                $scope.ad.image = res.path;
            })
        };

        $scope.confim = function () {
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
                        $scope.ad = {};
                    });
                }
            }
        };


    });
