'use strict';

angular.module('theHomePassApp')
  .factory('Modal', function ($rootScope, $modal, $q) {
    // Public API here
    return {
        login: function (cb) {
            var cb = cb || angular.noop;
            var defer = $q.defer();
            $modal.open({
                templateUrl: 'components/modal/login.html',
                controller: 'loginModalCtrl'
            }).result.then(function () {
                defer.resolve();
                return cb();
            }).catch(function (err) {
                defer.reject();
                return cb(err);
            });
        },

      /* Confirmation modals */
      confirm: {

        /**
         * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} del - callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        delete: function(del) {
          del = del || angular.noop;

          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed staight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
                name = args.shift(),
                deleteModal;

            deleteModal = openModal({
              modal: {
                dismissable: true,
                title: 'Confirmation',
                html: '<p>Êtes vous certain de vouloir supprimer <strong>' + name + '</strong> ?</p>',
                buttons: [{
                  classes: 'btn-danger',
                  text: 'Supprimer',
                  click: function(e) {
                    deleteModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Annuler',
                  click: function(e) {
                    deleteModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-danger');

            deleteModal.result.then(function(event) {
              del.apply(event, args);
            });
          };
        }
      }
    };
  });

angular.module('theHomePassApp')
    .controller('loginModalCtrl', function ($scope, $modalInstance, Auth, uiGmapGoogleMapApi, Restangular, $state) {
        $scope.user = {};
        $scope.errors = {};


        $scope.login = function (form) {
            if (form.$valid) {
                Auth.login({
                    email: $scope.user.email,
                    password: $scope.user.password
                })
                .then(function() {
                    toastr.success('Vous êtes à présent connecté');
                    $modalInstance.close(form);
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
                        toastr.success('Un mail de confirmation vous a été envoyé. Merci de cliquer sur le lien dans celui-ci pour valider votre inscription');
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
