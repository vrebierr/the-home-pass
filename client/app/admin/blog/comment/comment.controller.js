'use strict';

angular.module('theHomePassApp')
.controller('CommentAdminCtrl', function ($scope, comments, posts, users, $modal, Restangular) {
    $scope.posts = posts;
    $scope.users = users;
    $scope.comments = comments;

    $scope.comments = _.map($scope.comments, function (item) {
        item.author = _.findWhere($scope.users, {_id: item.author});
        item.target = _.findWhere($scope.posts, {_id: item.target});
        return item;
    });

    $scope.update = function (comment) {
        $scope.comment = Restangular.copy(comment);
        $modal.open({
            templateUrl: 'modal.html',
            scope: $scope
        }).result.then(function () {
            $scope.comment.put().then(function (data) {
                $scope.comments = _.map($scope.comments, function (item) {
                    if (item._id === data._id) {
                        item = data;
                        item.author = _.findWhere($scope.users, {_id: item.author});
                        item.target = _.findWhere($scope.posts, {_id: item.target});
                        return data;
                    }
                    else {
                        return item;
                    }
                });
                toastr.success('Commentaire modifiée !');
            }).catch(function () {
                toastr.error('Une erreur s\'est produite.');
            });
        });
    };

    $scope.confirm = function (comment) {
        $scope.comment = comment;
        $modal.open({
            templateUrl: 'confirm.html',
            scope: $scope
        }).result.then(function () {
            $scope.comment.remove().then(function () {
                $scope.comments = _.without($scope.comments, comment);
                toastr.success('Commentaire supprimée !');
            }).catch(function () {
                toastr.error('Une erreur s\'est produite.');
            });;
        });
    };
});
