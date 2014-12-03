'use strict';

angular.module('theHomePassApp')
    .controller('NavbarAdminCtrl', function ($scope, Restangular, Auth) {
        Restangular.all('items').getList().then(function (ads) {
            $scope.pending = _.filter(ads, function (item) {
                if (item.status === 'pending') {
                    return true;
                }
                else {
                    return false;
                }
            }).length;
        });

        $scope.logout = function() {
            Auth.logout();
        };
    });
