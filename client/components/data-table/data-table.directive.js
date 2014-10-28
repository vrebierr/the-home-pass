'use strict';

    angular.module('theHomePassApp')
        .directive('ngTable', function ($filter, $rootScope) {
            return {
                templateUrl: 'components/data-table/data-table.html',
                restrict: 'EA',
                scope: {
                    model: '=',
                    cols: '='
                },
                link: function (scope, element, attrs) {
                    scope.numItems = 10;
                    scope.currentStart = 1;
                    scope.currentEnd = scope.numItems;
                    scope.currentPage = 1;

                    scope.reload = function () {
                        scope.currentStart = (scope.currentPage - 1) * scope.numItems;
                        scope.currentEnd = scope.currentPage * scope.numItems;
                        if (scope.currentEnd > scope.model.length)
                            scope.currentEnd = scope.model.length;
                        scope.current = scope.model.slice(scope.currentStart, scope.currentEnd);
                    };

                    scope.update = function (item) {
                        $rootScope.$emit('update', item);
                    };

                    scope.delete = function (item) {
                        $rootScope.$emit('delete', item);
                    };

                    var filter = $filter('filter');
                    scope.$watch('search', function () {
                        scope.items = filter(scope.model, scope.search);
                    });

                    scope.$watch('model', function () {
                        scope.reload();
                    });
              }
          };
    });
