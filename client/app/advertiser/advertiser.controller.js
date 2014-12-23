'use strict';

angular.module('theHomePassApp')
    .controller('AdvertiserCtrl', function ($scope, ads, pos) {
        $scope.ads = _.map($scope.ads, function (item) {
            item;
        });
        $scope.pos = pos;
    });
