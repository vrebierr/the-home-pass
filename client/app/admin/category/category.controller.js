'use strict';

angular.module('theHomePassApp')
    .controller('CategoryCtrl', function ($scope, categories, $modal, Modal) {
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
                });
            });
        };

        $scope.update = function (category) {
            $scope.category = category;
            $modal.open({
                templateUrl: 'modal.html',
                scope: $scope
            }).result.then(function () {
                category.put();
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
