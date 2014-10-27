'use strict';

  angular.module('theHomePassApp')
      .directive('data-table', function ($rootScope) {
          return {
              template: 'components/data-table/data-table.html',
              restrict: 'EA',
              scope: {
                  model: '=',
              },
              link: function (scope, element, attrs) {
              }
          };
  });
