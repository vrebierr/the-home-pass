'use strict';

angular.module('theHomePassApp')
    .controller('PostAdminCtrl', function ($scope, post, tags) {
        $scope.post = post;
        $scope.tags = tags;

        $scope.ckeOptions = {
            language: 'fr'
        };

        $scope.addTag = function (name) {
            if (!_.contains(tags, {name: name})) {
                tags.post({name: name}).then(function (data) {
                    $scope.tags.push(data);
                    toastr.success('Catégorie crée !');
                }).catch(function () {
                    toastr.error('Une erreure s\'est produite.');
                });
            }
            toastr.error('Cette catégorie éxiste déjà !');
        };
    });
