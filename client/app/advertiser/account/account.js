'use strict';

angular.module('theHomePassApp')
    .config(function ($stateProvider) {
    $stateProvider
        .state('signupAdvertiser', {
            url: 'advertiser/signup',
            templateUrl: 'app/advertiser/account/signup/signup.html',
            controller: 'SignupAdvertiserCtrl',
            authenticate: true,
            resolve: {
                debug: function () {
                    return console.log('debug');
                }
            }
        });
    });
