'use strict';

angular.module('theHomePassApp')
    .config(function ($stateProvider) {
        $stateProvider
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
