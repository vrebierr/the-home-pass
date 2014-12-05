'use strict';

angular.module('theHomePassApp')
    .controller('BlogAdminCtrl', function ($scope, posts, $modal) {
        $scope.posts = posts;

        $scope.confirm = function (post) {
            $scope.post = post;
            $modal.open({
                templateUrl: 'confirm.html',
                scope: $scope
            }).result.then(function () {
                $scope.post.remove().then(function () {
                    $scope.posts = _.without($scope.posts, post);
                    toastr.error('Article supprimé !');
                }).catch(function () {
                    toastr.error('Une erreure s\'est produite.');
                });
            });
        };
    });
