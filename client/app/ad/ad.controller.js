'use strict';

angular.module('theHomePassApp')
    .controller('AdCtrl', function ($scope, ad, pos) {
        $scope.ad = ad
        $scope.pos = pos
    });
