'use strict';

angular.module('theHomePassApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('who', {
                url: '/qui-sommes-nous',
                templateUrl: 'app/static/who.html',
                controller: 'StaticCtrl'
            });
    });
