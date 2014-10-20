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
                type: '@',
                item: '='
            },
            link: function (scope, element, attrs) {
                if (scope.type != 'openstreetmap') {
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
                else {
                    var marker = L.marker(scope.pos).addTo(scope.map);
                    marker.on('click', function (e) {
                        scope.click();
                    });

                    var template = '<h3>' + scope.item.name + '</h3><em>' + scope.item.address + '</em><p>' + scope.item.info + '</p>';
                    marker.bindPopup(template);
                }
            }
        };
});
