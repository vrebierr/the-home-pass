'use strict';

angular.module('theHomePassApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('advertiser', {
                url: '/advertiser',
                templateUrl: 'app/advertiser/advertiser.html',
                controller: 'AdvertiserCtrl'
            })
                .state('signupAdvertiser', {
                url: '/advertiser/signup',
                templateUrl: 'app/advertiser/account/signup/signup.html',
                controller: 'SignupAdvertiserCtrl'
            })
            .state('loginAdvertiser', {
                url: '/advertiser/login',
                templateUrl: 'app/advertiser/account/login/login.html',
                controller: 'LoginAdvertiserCtrl'
            });
    });
