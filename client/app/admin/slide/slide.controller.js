'use strict';

angular.module('theHomePassApp')
.controller('SlideAdminCtrl', function ($scope, slides) {
    $scope.slides = slides;

    $scope.confirm = function (slide) {
        $scope.slide = slide;
        $modal.open({
            templateUrl: 'confirm.html',
            scope: $scope
        }).result.then(function () {
            slide.remove().then(function () {
                $scope.slides = _.without($scope.slides, slide);
                toastr.error('Slide supprimé !');
            }).catch(function () {
                toastr.error('Une erreur s\'est produite.');
            });
        });
    };
});
