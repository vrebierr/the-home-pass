'use strict';

  angular.module('theHomePassApp')
      .directive('ngTable', function ($rootScope) {
          return {
              templateUrl: 'components/data-table/data-table.html',
              restrict: 'EA',
              scope: {
                  model: '=',
              },
              link: function (scope, element, attrs) {
                  scope.items = scope.model.slice(0, 10);

                  scope.pageChanged = function () {
                      scope.items = scope.model.slice(10 * (scope.currentPage - 1), 10 * (scope.currentPage - 1) + 10);
                      console.log(10 * (scope.currentPage - 1));
                  };
              }
          };
  });
