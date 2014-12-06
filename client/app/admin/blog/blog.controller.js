'use strict';

angular.module('theHomePassApp')
    .controller('BlogAdminCtrl', function ($scope, posts, $modal, Restangular) {
        $scope.posts = posts;

        $scope.confirm = function (post) {
            $scope.post = post;
            $modal.open({
                templateUrl: 'confirm.html',
                scope: $scope
            }).result.then(function () {
                Restangular.one('posts', $scope.post._id).remove().then(function () {
                    $scope.posts = _.without($scope.posts, post);
                    toastr.error('Article supprimé !');
                }).catch(function () {
                    toastr.error('Une erreur s\'est produite.');
                });
            });
        };
    });
