'use strict';

angular.module('theHomePassApp')
    .controller('UserAdminCtrl', function ($scope) {
        $scope.send = function () {
            $http.post('/api/users/newsletter', $scope.newsletter, function (res) {
                console.log(res);
            });
        };
    });
