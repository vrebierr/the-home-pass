'use strict';

angular.module('theHomePassApp')
    .config(function ($stateProvider) {
        $stateProvider
        .state('blog', {
            url: '/blog',
            templateUrl: 'app/blog/blog.html',
            controller: 'BlogCtrl',
            resolve: {
                posts: function (Restangular) {
                    return Restangular.all('posts').getList();
                }
            }
        })
        .state('post', {
            url: '/blog/article/:slug',
            templateUrl: 'app/blog/post/post.html',
            controller: 'PostCtrl',
            resolve: {
                post: function (Restangular, $stateParams) {
                    return Restangular.all('posts').one('slug', $stateParams.slug).get();
                }
            }
        })
        .state('tag', {
            url: '/blog/tag/:name',
            templateUrl: 'app/blog/tag/tag.html',
            controller: 'TagCtrl',
            resolve: {
                tag: function (Restangular, $stateParams) {
                    return Restangular.all('tags').one('name', $stateParams.name).get();
                },
                posts: function (Restangular, tag) {
                    return Restangular.all('posts').one('tag', tag._id).getList();
                }
            }
        });
    });
