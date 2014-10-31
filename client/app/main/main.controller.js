'use strict';

angular.module('theHomePassApp')
    .controller('MainCtrl', ['$scope', 'pos', 'ads', 'categories', 'GoogleMapApi'.ns(), function ($scope, pos, ads, categories, GoogleMapApi) {
    	$scope.pos = pos;
        $scope.ads = ads;
        $scope.categories = categories;
        $scope.selected = {};

        GoogleMapApi.then(function (maps) {
            $scope.map = {
                center: {
                    latitude: 48.89670230000001,
                    longitude: 2.3183781999999997
                },
                zoom: 8,
            };

            $scope.events = {
                click: function (marker, eventName, model, args) {
                    $scope.ads = _.where(ads, {pos: [model._id]});
                }
            };
        });
    }]);
