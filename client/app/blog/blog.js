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
                },
                tags: function (Restangular) {
                    return Restangular.all('tags').getList();
                }
            }
        })
        .state('post', {
            url: '/blog/article/:title',
            templateUrl: 'app/blog/blog.html',
            controller: 'PostCtrl',
            resolve: {
                post: function (Restangular, $stateParams) {
                    return Restangular.all('posts').one('title', $stateParams.title).get();
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
