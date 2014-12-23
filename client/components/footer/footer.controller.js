'use strict';

angular.module('theHomePassApp')
    .controller('FooterCtrl', function ($scope, Restangular, Auth) {
        var flag = 0;

        angular.element('#copyrights').mouseup(function (e) {
            var selection = window.getSelection().toString();
            console.log(selection)
            if (selection === '© 2015 The Home Pass') {
                angular.element(this).text('Made with ♡ by vrebierr');
                flag = 1;
            }
            e.stopPropagation();
        });

        angular.element(document).mouseup(function () {
            if (flag) {
                angular.element('#copyrights').text('© 2015 The Home Pass');
            }
        });
    });
