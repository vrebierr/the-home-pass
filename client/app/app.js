'use strict';

angular.module('theHomePassApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'btford.socket-io',
    'ui.router',
    'restangular',
    'angularFileUpload',
    'selectize-ng',
    'uuid4',
    'uiGmapgoogle-maps',
    'mm.foundation',
    'infinite-scroll',
    'LocalStorageModule',
    'highcharts-ng',
    'angularMoment',
    'ngCkeditor',
    'pascalprecht.translate'
])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, RestangularProvider, uiGmapGoogleMapApiProvider, $translateProvider) {
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true).hashPrefix('!');
        $httpProvider.interceptors.push('authInterceptor');

        // restangular - config
        RestangularProvider.setBaseUrl('/api');
        RestangularProvider.setRestangularFields({id: '_id'});

        uiGmapGoogleMapApiProvider.configure({
            libraries: 'places'
        });

        toastr.options = {
            progressBar: true,
            closeButton: true,
            timeout: 2000
        };

        $translateProvider.translations('fr', {
            draft: 'Brouillon',
            pending: 'En attente',
            published: 'Publié'
        });
        $translateProvider.preferredLanguage('fr');
    })

    .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
        return {
            // Add authorization token to headers
            request: function (config) {
                config.headers = config.headers || {};
                if ($cookieStore.get('token')) {
                    config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
                }
                return config;
            },

            // Intercept 401s and redirect you to login
            responseError: function(response) {
                if(response.status === 401) {
                    $location.path('/login');
                    // remove any stale tokens
                    $cookieStore.remove('token');
                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            }
        };
    })

    .run(function ($rootScope, $location, Auth) {
        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$stateChangeStart', function (event, next) {
            Auth.isLoggedInAsync(function(loggedIn) {
                if (next.authenticate && !loggedIn) {
                    $location.path('/login');
                }
            });
        });
    });
