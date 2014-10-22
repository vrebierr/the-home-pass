'use strict';

angular.module('theHomePassApp')
    .controller('CategoryCtrl', function ($scope, categories, $modal, Modal) {
        $scope.categories = categories;
        $scope.category = {};

        $scope.create = function () {
            $modal.open({
                templateUrl: 'components/modal/category.html',
            }).result.then(function (res) {
                categories.post(res).then(function (res) {
                    $scope.categories.push(res);
                });
            });
        };

        $scope.confirm = function (category) {
            $modal.open({
                templateUrl: 'components/modal/confirm.html'
            }).result.then(function () {
                category.remove().then(function () {
                    $scope.categories = _.without($scope.categories, category);
                });
            })
        };
    });
