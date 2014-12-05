'use strict';

angular.module('theHomePassApp')
    .controller('TagAdminCtrl', function ($scope, tags, $modal, Restangular) {
        $scope.tags = tags;
        $scope.tag = {};

        $scope.create = function () {
            $scope.tag = {};
            $modal.open({
                templateUrl: 'modal.html',
                scope: $scope
            }).result.then(function () {
                tags.post($scope.tag).then(function (res) {
                    $scope.tags.push(res);
                    toastr.success('Catégorie crée !');
                }).catch(function () {
                    toastr.error('Une erreure s\'est produite.');
                });
            });
        };

        $scope.update = function (tag) {
            $scope.tag = Restangular.copy(tag);
            $modal.open({
                templateUrl: 'modal.html',
                scope: $scope
            }).result.then(function () {
                $scope.tag.put().then(function (res) {
                    $scope.tags = _.map($scope.tags, function (item) {
                        if (item._id === res._id) {
                            return res;
                        }
                        else {
                            return item;
                        }
                    });
                    toastr.info('Catégorie modifiée !');
                }).catch(function () {
                    toastr.error('Une erreure s\'est produite.');
                });
            });
        };

        $scope.confirm = function (tag) {
            $scope.tag = tag;
            $modal.open({
                templateUrl: 'confirm.html',
                scope: $scope
            }).result.then(function () {
                tag.remove().then(function () {
                    $scope.tags = _.without($scope.tags, tag);
                    toastr.error('Catégorie supprimée !');
                }).catch(function () {
                    toastr.error('Une erreure s\'est produite.');
                });
            });
        };
    });
