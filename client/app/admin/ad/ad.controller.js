'use strict';

angular.module('theHomePassApp')
    .controller('AdAdminCtrl', function ($scope, ads, $rootScope, $modal, Restangular, users, categories, $stateParams) {
        $scope.ads = ads;
        $scope.categories = categories;
        $scope.ad = {};

        $scope.params = $stateParams;

        $scope.$watchCollection('ads', function () {
            $scope.ads = _.map($scope.ads, function (item) {
                item.author = _.findWhere(users, {_id: item.author});
                item.category = _.findWhere(categories, {_id: item.category});
                return item;
            });
        });

        var baseAds = Restangular.all('items');
        $scope.create = function () {
            $scope.ad = {};
            $modal.open({
                templateUrl: 'modal.html',
                scope: $scope
            }).result.then(function () {
                ads.post($scope.ads).then(function (res) {
                    $scope.ads.push(res);
                }).catch(function () {
                    toastr.error('Une erreure s\'est produite.');
                });;
            });
        };

        $scope.update = function (ad) {
            $scope.ad = Restangular.copy(ad);
            console.log($scope.ad);
            $modal.open({
                templateUrl: 'modal.html',
                scope: $scope
            }).result.then(function () {
                $scope.ad.category = $scope.ad.category._id;
                Restangular.one('items', $scope.ad._id).customPUT($scope.ad).then(function (data) {
                    $scope.ads = _.map($scope.ads, function (item) {
                        if (item._id === data._id) {
                            return data;
                        }
                        else {
                            return item;
                        }
                    });
                    if ($stateParams.state != data.status) {
                        $scope.ads = _.without($scope.ads, data);
                    }

                    toastr.success('Annonce modifiée !');
                }).catch(function () {
                    toastr.error('Une erreure s\'est produite.');
                });;
            });
        };

        $scope.confirm = function (ad) {
            $scope.ad = ad;
            $modal.open({
                templateUrl: 'confirm.html',
                scope: $scope
            }).result.then(function () {
                Restangular.one('items', ad._id).remove().then(function () {
                    $scope.ads = _.without($scope.ads, ad);
                    toastr.success('Annonce supprimée !');
                }).catch(function () {
                    toastr.error('Une erreure s\'est produite.');
                });;
            });
        };
    });
