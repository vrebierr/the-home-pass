'use strict';

    angular.module('theHomePassApp')
        .directive('ngTable', function ($filter, $rootScope) {
            return {
                templateUrl: function (elem, attr) {
                    return 'components/data-table/'+attr.type+'.html';
                },
                restrict: 'EA',
                scope: {
                    model: '=',
                    cols: '='
                },
                link: function (scope) {
                    scope.numItems = 10;
                    scope.currentStart = 1;
                    scope.currentEnd = scope.numItems;
                    scope.currentPage = 1;
                    scope.items = scope.model;
                    scope.length = scope.items.length;

                    scope.reload = function (items) {
                        if (scope.currentEnd > items.length) {
                            scope.currentEnd = items.length;
                            scope.currentPage = 1;
                        }
                        else {
                            scope.currentEnd = scope.currentPage * scope.numItems;
                        }
                        scope.currentStart = (scope.currentPage - 1) * scope.numItems;

                        scope.current = items.slice(scope.currentStart, scope.currentEnd);
                    };

                    scope.update = function (item) {
                        $rootScope.$emit('update', item);
                    };

                    scope.delete = function (item) {
                        $rootScope.$emit('delete', item);
                    };

                    scope.logAs = function (item) {
                        $rootScope.$emit('logAs', item);
                    };

                    scope.validate = function (item) {
                        $rootScope.$emit('validate', item);
                    };

                    var filter = $filter('filter');
                    scope.$watch('search', function () {
                        scope.items = filter(scope.model, scope.search);
                        scope.reload(scope.items);
                    });

                    scope.$watch('status', function () {
                        scope.items = filter(scope.model, scope.search);
                        scope.reload(scope.items);
                    });

                    scope.$watchCollection('model', function () {
                        scope.reload(scope.model);
                    });

                    scope.$watchCollection('items', function () {
                        scope.length = scope.items.length;
                    });

                    var orderBy = $filter('orderBy');
                    scope.order = function (predicate) {
                        if (scope.predicate === predicate) {
                            scope.reverse = !scope.reverse;
                            scope.current = orderBy(scope.current, predicate, scope.reverse);
                        }
                        else {
                            scope.predicate = predicate;
                            scope.reverse = false;
                            scope.current = orderBy(scope.current, scope.predicate);
                        }
                    };
              }
          };
    });
