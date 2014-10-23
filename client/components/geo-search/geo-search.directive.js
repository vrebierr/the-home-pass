'use strict';

angular.module('theHomePassApp')
    .directive('geoSearch', function () {
        return {
            templateUrl: 'components/geo-search/geo-search.html',
            restrict: 'EA',
            scope: {
                model: '=',
                event: '&'
            },
            link: function (scope, element, attrs) {
                scope.initialize = function () {
                    var geocoder = new google.maps.Geocoder();
                    var input = document.getElementById('search');
                    var search = new google.maps.places.SearchBox(input);

                    google.maps.event.addListener(search, 'places_changed', function () {
                        var place = search.getPlaces()[0];

                        if (place === undefined)
                            return;

                        scope.model.address = place.formatted_address;
                        scope.model.lat = place.geometry.location.k;
                        scope.model.lng = place.geometry.location.B;

                        scope.event();
                    });
                };

                google.maps.event.addDomListener(window, 'load', scope.initialize());
            }
        };
    });
