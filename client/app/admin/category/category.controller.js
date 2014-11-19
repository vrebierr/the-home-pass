'use strict';

angular.module('theHomePassApp')
    .controller('CategoryAdminCtrl', function ($scope, $rootScope, categories, $modal, Restangular) {
        $scope.categories = categories;
        $scope.category = {};

        $scope.create = function () {
            $scope.category = {};
            $modal.open({
                templateUrl: 'modal.html',
                scope: $scope
            }).result.then(function () {
                categories.post($scope.category).then(function (res) {
                    $scope.categories.push(res);
                    toastr.success('Catégorie crée !');
                });
            });
        };

        $scope.update = function (category) {
            $scope.category = Restangular.copy(category);
            $modal.open({
                templateUrl: 'modal.html',
                scope: $scope
            }).result.then(function () {
                $scope.category.put().then(function (res) {
                    $scope.categories = _.map($scope.categories, function (item) {
                        if (item._id === res._id) {
                            return res;
                        }
                        else {
                            return item;
                        }
                    });
                    toastr.success('Catégorie modifiée !');
                });
            });
        };

        $scope.confirm = function (category) {
            $scope.category = category;
            $modal.open({
                templateUrl: 'confirm.html',
                scope: $scope
            }).result.then(function () {
                category.remove().then(function () {
                    $scope.categories = _.without($scope.categories, category);
                    toastr.success('Catégorie supprimée !');
                });
            });
        };

        $rootScope.$on('update', function (event, data) {
            $scope.update(data);
        });

        $rootScope.$on('delete', function (event, data) {
            $scope.confirm(data);
        });
    });
