'use strict';

angular.module('theHomePassApp')
    .controller('SidebarCtrl', function ($scope, Restangular) {
        Restangular.all('tags').getList().then(function (tags) {
            $scope.tags = tags;
            $scope.$apply();
        });
    });
