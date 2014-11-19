'use strict';

angular.module('theHomePassApp')
    .controller('AdCtrl', function ($scope, ads, $rootScope, $modal, Restangular, users, categories) {
        $scope.ads = ads;
        $scope.categories = categories;
        $scope.ad = {};
        $scope.status = [{
            id: 'pending',
            name: 'En attente'
        }, {
            id: 'archived',
            name: 'Archivée'
        }, {
            id: 'enabled',
            name: 'Activée'
        }];

        $scope.$watchCollection('ads', function () {
            $scope.ads = _.map($scope.ads, function (item) {
                item.author = _.findWhere(users, {_id: item.author});
                item.category = _.findWhere(categories, {_id: item.category});
                return item;
            });
        });

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
                $scope.ad.category = $scope.ad.category._id;
                $scope.ad.put().then(function (res) {
                    $scope.ads = _.map($scope.ads, function (item) {
                        if (item._id === res._id) {
                            return res;
                        }
                        else {
                            return item;
                        }
                    });
                    toastr.success('Annonce modifiée !');
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
                    toastr.success('Annonce supprimée !');
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
