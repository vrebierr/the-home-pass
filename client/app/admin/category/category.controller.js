'use strict';

angular.module('theHomePassApp')
    .controller('CategoryCtrl', function ($scope, categories, $modal, Restangular, DTColumnDefBuilder, DTOptionsBuilder) {
        $scope.categories = categories;
        $scope.category = {};

        $scope.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1).notSortable()
        ];
        $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');

        $scope.create = function () {
            $scope.category = {};
            $modal.open({
                templateUrl: 'modal.html',
                scope: $scope
            }).result.then(function () {
                categories.post($scope.category).then(function (res) {
                    $scope.categories.push(res);
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
                });
            })
        };
    });
