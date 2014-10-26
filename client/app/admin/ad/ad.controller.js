'use strict';

angular.module('theHomePassApp')
    .controller('AdCtrl', function ($scope, ads) {
        $scope.ads = ads;

        $scope.validate = function (ad) {
            
        };
    });
