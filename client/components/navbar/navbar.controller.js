'use strict';

angular.module('theHomePassApp')
    .controller('NavbarCtrl', function ($scope, $rootScope, Auth, $state, $modal, Restangular) {
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
    .controller('loginModalCtrl', function ($scope, $modalInstance, Auth, uiGmapGoogleMapApi) {
        $scope.user = {};
        $scope.errors = {};

        uiGmapGoogleMapApi.then(function (maps) {
            var input = document.getElementById('search');
            var autocomplete = new google.maps.places.Autocomplete(
            /** @type {HTMLInputElement} */(input));

            var components = {
                street_number: 'short_name',
                country: 'long_name',
                postal_code: 'short_name',
                administrative_area_level_1: 'short_name'
            };

            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                var place = autocomplete.getPlace();
                $scope.user.from = {
                    latitude: place.geometry.location.k,
                    longitude: place.geometry.location.B
                };
                console.log($scope.user);
                for (var i = 0; i < place.address_components.length; i++) {
                    var type = place.address_components[i];
                    if (components[type]) {
                        if (type === 'street_number')
                            $scope.user.from.street_number = place.address_components[i][components[type]];
                        if (type === 'country')
                            $scope.user.from.country = place.address_components[i][components[type]];
                        if (type === 'administrative_area_level_1')
                            $scope.user.from.city = place.address_components[i][components[type]];

                    }
                    console.log(place.address_components[i])
                }
            });
        });

        $scope.login = function (form) {
            if (form.$valid) {
                Auth.login({
                    email: $scope.user.email,
                    password: $scope.user.password
                })
                .then(function() {
                    $modalInstance.close(form);
                })
                .catch(function (err) {
                    $scope.err = err;
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
