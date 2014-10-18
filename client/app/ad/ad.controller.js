'use strict';

angular.module('theHomePassApp')
    .controller('AdvertiserCtrl', function ($scope, ads, Restangular, FileUploader, $modal) {
        $scope.ads = ads;
    });
