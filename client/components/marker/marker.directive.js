'use strict';

angular.module('theHomePassApp')
    .directive('marker', function ($rootScope) {
        return {
            template: '',
            restrict: 'EA',
            scope: {
                pos: '=',
                map: '=',
                click: '&',
                item: '='
            },
            link: function (scope, element, attrs) {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(scope.pos[0], scope.pos[1]),
                    map: scope.map,
                });
                google.maps.event.addListener(marker, 'click', function (event) {
                    $rootScope.$emit('selected');
                    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
                    scope.click();
                });

                $rootScope.$on('selected', function () {
                    marker.setIcon(null);
                });
                scope.$on('$destroy', function () {
                    marker.setMap(null);
                });

                $rootScope.$on('select', function (event, data) {
                    if (data === scope.item._id) {
                        $rootScope.$emit('selected');
                        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
                    }
                });
            }
        };
});
