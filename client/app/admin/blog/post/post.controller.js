'use strict';

angular.module('theHomePassApp')
    .controller('PostAdminCtrl', function ($scope, post, tags, $modal, localStorageService, Restangular, $state) {
        $scope.post = post;
        $scope.tags = tags;

        $scope.ckeOptions = {
            language: 'fr'
        };

        $scope.addTag = function () {
            $scope.tag = {};
            $modal.open({
                templateUrl: 'addTag.html',
                scope: $scope
            }).result.then(function () {
                if (!_.find($scope.tags, {name: name})) {
                    tags.post($scope.tag).then(function (res) {
                        $scope.tags.push(res);
                        toastr.success('Catégorie crée !');
                        $scope.tag = {};
                    }).catch(function () {
                        toastr.error('Une erreure s\'est produite.');
                    });;
                }
                else {
                    toastr.error('Cette catégorie éxiste déjà !');
                }
            });
        };

        $scope.config = {
            plugins: ['remove_button'],
            labelField: 'name',
            searchField: ['name'],
            valueField: '_id',
            create: false,
            render: {
                option: function (item) {
                    return '<div><strong>' + item.name + '</strong></div>';
                }
            }
        };

        $scope.save = function () {
            if (_.isString($scope.post.tags)) {
                $scope.post.tags = $scope.post.tags.split(',');
            }

            if ($scope.post._id) {
                $scope.post.put().then(function (data) {
                    $scope.post = data;
                    toastr.success('Les modifications ont été sauvegardés !');
                }).catch(function () {
                    toastr.error('Une erreure s\'est produite.');
                });
            }
            else {
                Restangular.all('posts').post($scope.post).then(function (data) {
                    $scope.post = data;
                    console.log(data);
                    toastr.success('L\'article a été crée !');
                    $state.go('postAdmin', {id: data._id});
                }).catch(function () {
                    toastr.error('Une erreure s\'est produite.');
                });
            }
        };
    });
