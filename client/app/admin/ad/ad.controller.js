'use strict';

angular.module('theHomePassApp')
    .controller('AdCtrl', function ($scope, ads, $rootScope, $modal, Restangular) {
        $scope.ads = ads;
        $scope.ad = {};

        console.log(ads);

        $scope.create = function () {
            $scope.ad = {};
            $modal.open({
                templateUrl: 'modal.html',
                scope: $scope
            }).result.then(function () {
                ads.post($scope.ads).then(function (res) {
                    $scope.ads.push(res);
                });
            });
        };

        $scope.update = function (ad) {
            $scope.ad = Restangular.copy(ad);
            $modal.open({
                templateUrl: 'modal.html',
                scope: $scope
            }).result.then(function () {
                $scope.ad.put().then(function (res) {
                    $scope.ads = _.map($scope.ads, function (item) {
                        if (item._id === res._id) {
                            return res;
                        }
                        else {
                            return item;
                        }
                    });
                });
            });
        };

        $scope.confirm = function (ad) {
            $scope.ad = ad;
            $modal.open({
                templateUrl: 'confirm.html',
                scope: $scope
            }).result.then(function () {
                ad.remove().then(function () {
                    $scope.ads = _.without($scope.ads, ad);
                });
            })
        };

        $rootScope.$on('update', function (event, data) {
            $scope.update(data);
        });

        $rootScope.$on('delete', function (event, data) {
            $scope.confirm(data);
        });
    });
