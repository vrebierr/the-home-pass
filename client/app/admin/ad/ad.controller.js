'use strict';

angular.module('theHomePassApp')
    .controller('AdAdminCtrl', function ($scope, ads, $rootScope, $modal, Restangular, users, categories) {
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
            $modal.open({
                templateUrl: 'modal.html',
                scope: $scope
            }).result.then(function () {
                console.log($scope.ad);
                Restangular.one('items', $scope.ad._id).customPUT($scope.ad).then(function (res) {
                    $scope.ads = _.map($scope.ads, function (item) {
                        if (item._id === res._id) {
                            return res;
                        }
                        else {
                            return item;
                        }
                    });
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
