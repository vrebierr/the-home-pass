'use strict';

angular.module('theHomePassApp')
    .controller('NewsletterCtrl', function ($scope, $modal, $http) {
        $scope.newsletter = {};

        $scope.send = function () {
            $modal.open({
                templateUrl: 'confirm.html',
                scope: $scope
            }).result.then(function () {
                $http.post('/api/users/admin/newsletter', $scope.newsletter).success(function (res) {

                });
            });
        };
    });
