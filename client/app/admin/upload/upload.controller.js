'use strict';

angular.module('theHomePassApp')
.controller('UploadAdminCtrl', function ($scope, uploads) {
    $scope.uploads = uploads;

    $scope.upload = function () {
        $scope.tag = {};
        $modal.open({
            templateUrl: 'modal.html',
            scope: $scope
        }).result.then(function () {
            tags.post($scope.tag).then(function (res) {
                $scope.tags.push(res);
                toastr.success('Catégorie crée !');
            }).catch(function () {
                toastr.error('Une erreur s\'est produite.');
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
                toastr.error('Une erreur s\'est produite.');
            });
        });
    };
});
