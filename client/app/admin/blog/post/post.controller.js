'use strict';

angular.module('theHomePassApp')
    .controller('PostAdminCtrl', function ($scope, post, tags, $modal) {
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
                if (!_.contains(tags, {name: name})) {
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
                    return '<div><strong>' + item.name + '</strong><br><em>' + item.address + '</em></div>';
                }
            }
        };
    });
