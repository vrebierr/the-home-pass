'use strict';

angular.module('theHomePassApp')
    .controller('AdvertiserCtrl', ['$scope', 'ads', 'pos', 'categories', 'Restangular', 'Modal', '$upload', 'GoogleMapApi'.ns(), function ($scope, ads, pos, categories, Restangular, Modal, $upload, GoogleMapApi) {
        $scope.ads = ads;
        $scope.ad = {
            type: 'euro'
        };
        $scope.pos = pos;
        $scope.categories = categories;

        $scope.$watch('ad.pos', function () {
            if (!$scope.ad.pos) {
                $scope.circles = [];
            }
            else {
                $scope.circles = [];

                $scope.ad.pos.split(',').map(function (item) {
                    _.forEach($scope.pos, function (pos) {
                        if (pos._id === item) {
                            $scope.circles.push(pos);
                        }
                    });
                });
            }
        });

        $scope.posSelected = function () {
            if (!$scope.ad.pos) {
                $scope.ad.pos = '';

                _.forEach($scope.pos, function (item) {
                    item.icon = null;
                });
            }
            else {
                var tmp = $scope.ad.pos.split(',');

                _.forEach($scope.pos, function (item) {
                    if (_.contains(tmp, item._id)) {
                        item.icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
                    }
                    else {
                        item.icon = null;
                    }
                });
            }
        };

        GoogleMapApi.then(function (maps) {
            $scope.map = {
                center: {
                    latitude: 48.89670230000001,
                    longitude: 2.3183781999999997
                },
                zoom: 8,
            };

            $scope.circle = {
                stroke: {
                    color: '#ff',
                    weight: 2,
                    opacity: 0.5
                },
                fill: {
                    color: '#ff',
                    opacity: 0.25
                }
            };

            $scope.events = {
                click: function (marker, eventName, model, args) {
                    if (!$scope.ad.pos) {
                        $scope.ad.pos = '';
                    }

                    var tmp = $scope.ad.pos.split(',');
                    if (_.contains(tmp, model._id)) {
                        marker.setIcon(null);
                        tmp = _.without(tmp, model._id);
                        $scope.ad.pos = tmp.join();
                    }
                    else {
                        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
                        $scope.ad.pos += ',' + model._id;
                    }
                }
            };
        });

        $scope.onFileSelect = function ($files) {
            $scope.upload = $upload.upload({
                url: 'api/uploads/',
                file: $files[0]
            }).success(function (res) {
                $scope.ad.image = res.path;
            })
        };

        $scope.confirm = function () {
            Modal.confirm.delete(function () {
                $scope.selected.remove().then(function () {
                    $scope.pos = _.without($scope.pos, $scope.selected);
                });
            });
        };

        var baseAds = Restangular.all('ads');
        $scope.send = function (form) {
            if (form.$valid) {
                if ($scope.ad._id) {
                    $scope.ad.put();
                }
                else {
                    baseAds.post($scope.ad).then(function (ad) {
                        $scope.ads.push(ad);
                        $scope.ad = {
                            type: 'euro'
                        };
                        $scope.posSelected();
                    });
                }
            };
        };

        $scope.config = {
            plugins: ['remove_button'],
            labelField: 'name',
            searchField: ['name', 'address'],
            valueField: '_id',
            create: false,
            render: {
                option: function (item) {
                    return '<div><strong>' + item.name + '</strong><br><em>' + item.address + '</em></div>';
                }
            }
        };

        $('#daterange').daterangepicker({

        },
        function(start, end) {
            $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        });
    }]);
