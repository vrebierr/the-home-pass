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
                        return Restangular.all('posts').all('admin').getList();
                    }
                }
            })
            .state('postAdmin', {
                url: '/admin/post/:id',
                templateUrl: 'app/admin/blog/post/post.html',
                controller: 'PostAdminCtrl',
                resolve: {
                    post: function (Restangular, $stateParams) {
                        if ($stateParams.id) {
                            return Restangular.one('posts', $stateParams.id).get();
                        }
                        return {};
                    },
                    tags: function (Restangular) {
                        return Restangular.all('tags').getList();
                    }
                }
            })
            .state('postPreview', {
                url: '/admin/post/preview/:id',
                templateUrl: 'app/blog/post/post.html',
                controller: 'PostCtrl',
                resolve: {
                    post: function (Restangular, $stateParams) {
                        return Restangular.one('posts', $stateParams.id).get();
                    },
                    comments: function (Restangular, $stateParams) {
                        return Restangular.all('comments').one('post', $stateParams.id).getList();
                    }
                }
            })
            .state('tagAdmin', {
                url: '/admin/tag',
                templateUrl: 'app/admin/blog/tag/tag.html',
                controller: 'TagAdminCtrl',
                resolve: {
                    tags: function (Restangular) {
                        return Restangular.all('tags').getList();
                    }
                }
            })
            .state('commentAdmin', {
                url: '/admin/comment',
                templateUrl: 'app/admin/blog/comment/comment.html',
                controller: 'CommentAdminCtrl',
                resolve: {
                    comments: function (Restangular) {
                        return Restangular.all('comments').getList();
                    },
                    posts: function (Restangular) {
                        return Restangular.all('posts').all('admin').getList();
                    },
                    users: function (Restangular) {
                        return Restangular.all('users').getList();
                    }
                }
            });
        });
