'use strict';

angular.module('theHomePassApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('blogAdmin', {
                url: '/admin/blog',
                templateUrl: 'app/admin/blog/blog.html',
                controller: 'BlogAdminCtrl',
                resolve: {
                    posts: function (Restangular) {
                        return Restangular.all('posts').getList();
                    }
                }
            })
            .state('postAdmin', {
                url: '/admin/post',
                templateUrl: 'app/admin/blog/post/post.html',
                controller: 'PostAdminCtrl',
                resolve: {
                    post: function (Restangular, $stateParams) {
                        if ($stateParams.id) {
                            return Restangular.one('posts', $stateParams.id).get();
                        }
                        return {};
                    }
                }
            });
        });