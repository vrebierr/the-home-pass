'use strict';

angular.module('theHomePassApp')
    .controller('LikeCtrl', function ($scope, ads) {
        $scope.ads = ads;
    });
