'use strict';

angular.module('theHomePassApp')
    .controller('PostCtrl', function ($scope, post, comments, Restangular) {
        $scope.post = post;
        $scope.comments = comments;

        $scope.send = function (form) {
            if (form.$valid) {
                $scope.comment.post = $scope.post._id;
                Restangular.all('comments').post($scope.comment).then(function (data) {
                    $scope.comments.push(data);
                    toastr.success('Votre commentaire a bien été ajouté.')
                }).catch(function (err) {
                    toastr.error('Une erreur est survenue.')
                });
            }
        };
    });
