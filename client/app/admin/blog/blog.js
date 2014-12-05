'use strict';

angular.module('theHomePassApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('blog', {
        url: '/admin/blog',
        templateUrl: 'app/admin/blog/blog.html',
        controller: 'BlogAdminCtrl'
      })
      .state('post', {
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
