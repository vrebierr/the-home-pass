'use strict';

angular.module('theHomePassApp')
.controller('SidebarCtrl', function ($scope, Restangular) {
        Restangular.all('tags').getList(function (tags) {
            $scope.tags = tags;
        });
    });
