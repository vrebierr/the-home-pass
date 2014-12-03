'use strict';

angular.module('theHomePassApp')
    .controller('NavbarCtrl', function ($scope, $rootScope, Auth, $state, $modal, Restangular) {
        $scope.menu = [{
            'title': 'Home',
            'link': '/'
        }];

        $scope.Auth = Auth;
        $scope.isCollapsed = true;
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.getCurrentUser = Auth.getCurrentUser;
        $scope.user = {};

        $scope.loginModal = function () {
            $scope.modal = $modal.open({
                templateUrl: 'loginModal.html',
                scope: $scope,
                windowClass: 'tiny',
                controller: 'loginModalCtrl'
            }).result.then(function () {
                Restangular.one('users', 'me').get().then(function (user) {
                    if(user.role === 'advertiser') {
                        $state.go('advertiser');
                    }
                    else if (user.role === 'admin') {
                        $state.go('admin');
                    }
                    else {
                        $state.go('main');
                    }
                });
            });
        };

        $scope.registerModal = function () {
            $scope.modal = $modal.open({
                templateUrl: 'registerModal.html',
                scope: $scope,
                windowClass: '',
                controller: 'loginModalCtrl'
            }).result.then(function () {
                Restangular.one('users', 'me').get().then(function (user) {
                    if(user.role === 'advertiser') {
                        $state.go('advertiser');
                    }
                    else if (user.role === 'admin') {
                        $state.go('admin');
                    }
                    else {
                        $state.go('main');
                    }
                });
            });
        };

        $scope.logout = function() {
            Auth.logout();
        };
    });

angular.module('theHomePassApp')
    .controller('loginModalCtrl', function ($scope, $modalInstance, Auth) {
        $scope.user = {};
        $scope.errors = {};

        $scope.login = function (form) {
            if (form.$valid) {
                Auth.login({
                    email: $scope.user.email,
                    password: $scope.user.password
                })
                .then(function() {
                    $modalInstance.close(form);
                });
            }
        };

        $scope.register = function(form) {
            $scope.submitted = true;
            console.log(form)
            if ($scope.user.password !== $scope.user.retype) {
                $scope.form.$valid = false;
            }

            if(form.$valid) {
                if ($scope.user.password === $scope.user.retype) {
                    Auth.createUser({
                        name: $scope.user.name,
                        email: $scope.user.email,
                        password: $scope.user.password
                    }).then( function() {
                        // Account created, redirect to home
                        $state.go('main');
                    }).catch(function(err) {
                        err = err.data;
                        console.log(err)
                        $scope.errors = {};

                        // Update validity of form fields that match the mongoose errors
                        angular.forEach(err.errors, function(error, field) {
                            form[field].$setValidity('mongoose', false);
                            $scope.errors[field] = error.message;
                        });
                    });
                }
            }
        };
    });
