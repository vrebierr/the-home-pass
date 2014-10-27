'use strict';

    angular.module('theHomePassApp')
        .directive('ngTable', function ($filter) {
            return {
                templateUrl: 'components/data-table/data-table.html',
                restrict: 'EA',
                scope: {
                    model: '=',
                    cols: '='
                },
                link: function (scope, element, attrs) {
                    scope.items = scope.model;
                    scope.current = scope.items.slice(0, 10);
                    scope.currentStart = 1;
                    scope.currentEnd = 10;

                    scope.pageChanged = function () {
                        scope.current = scope.items.slice(10 * (scope.currentPage - 1), 10 * (scope.currentPage - 1) + 10);
                        scope.currentStart = 10 * (scope.currentPage - 1) + 1;
                        scope.currentEnd = 10 * (scope.currentPage - 1) + 10;
                    };

                    var filter = $filter('filter');
                    scope.$watch('search', function () {
                        scope.items = filter(scope.model, scope.search);
                    });
              }
          };
    });
