'use strict';

angular.module('theHomePassApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'MainCtrl',
                authenticate: true,
                resolve: {
                    pos: function (Restangular) {
                        return Restangular.all('pos').getList();
                    },
                    ads: function (Restangular) {
                        return Restangular.all('items').getList();
                    },
                    categories: function (Restangular) {
                        return Restangular.all('categories').getList();
                    },
                    uploads: function (Restangular) {
                        return Restangular.all('uploads').getList();
                    },
                    slides: function (Restangular) {
                        return Restangular.all('slides').getList();
                    }
                }
            });
    });
