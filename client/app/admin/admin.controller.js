'use strict';

angular.module('theHomePassApp')
    .controller('AdminCtrl', function ($scope) {
        $scope.config = {
            ads: {
                title: {text: 'Annonces'},
                subtitle: {text: 'Actuellement ' + 1 + ' annonces en ligne.'},
                options: {
                    char: {
                        type: 'line'
                    }

                },

            }
        };
    });
