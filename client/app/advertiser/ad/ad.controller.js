'use strict';

angular.module('theHomePassApp')
    .controller('AdvertiserAdCtrl', function ($scope, ads, pos, categories, Restangular, Modal, $upload, uiGmapGoogleMapApi, users) {
        $scope.ads = ads;
        $scope.ad = {
            valueType: 'euro'
        };
        $scope.pos = pos;
        $scope.categories = categories;
        $scope.users = users;
        $scope.scope = 0;

        $scope.refresh = function () {
            if ($scope.ad.pos && $scope.ad.range) {
                var tmp = $scope.ad.pos.split(',');
                var users_tmp = [];

                _.forEach(tmp, function (item) {
                    item = _.findWhere($scope.pos, {_id: item})

                    _.forEach(users, function (user) {
                        if (user.to || user.from) {
                            if (user.to) {
                                var dist_to = geolib.getDistance({
                                    latitude: item.latitude,
                                    longitude: item.longitude
                                }, {
                                    latitude: user.to.latitude,
                                    longitude: user.to.longitude
                                });
                            }
                            if (user.from) {
                                var dist_from = geolib.getDistance({
                                    latitude: item.latitude,
                                    longitude: item.longitude
                                }, {
                                    latitude: user.from.latitude,
                                    longitude: user.from.longitude
                                });
                            }

                            if (dist_from < $scope.ad.range * 1000 || dist_to < $scope.ad.range * 1000) {
                                users_tmp.push(user);
                            }
                        }
                    });
                });
                $scope.scope = _.uniq(users_tmp).length;
                console.log(users_tmp);
            }
            else {
                $scope.scope = 0;
            }
        };

        $scope.$watch('ad.range', function () {
            $scope.refresh();
        });

        $scope.$watch('ad.pos', function (oldValue, newValue) {
            if (!$scope.ad.pos) {
                $scope.ad.pos = '';
                $scope.circles = [];

                _.forEach($scope.pos, function (item) {
                    item.icon = null;
                });
            }
            else {
                $scope.circles = [];
                var tmp = $scope.ad.pos.split(',');

                _.forEach($scope.pos, function (item) {
                    if (_.contains(tmp, item._id)) {
                        item.icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
                        $scope.circles.push(item);
                    }
                    else {
                        item.icon = null;
                    }
                });

                var diff = _.difference(oldValue.split(','), newValue.split(','));
                var pos = _.findWhere($scope.pos, {_id: diff[0]});

                if (pos) {
                    $scope.map.center.latitude = pos.latitude;
                    $scope.map.center.longitude = pos.longitude;
                }
            }
            $scope.refresh();
        });

        uiGmapGoogleMapApi.then(function (maps) {
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

        var baseAds = Restangular.all('items');
        $scope.send = function (form) {
            console.log(form)
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
                        $scope.submitted = false;
                        toastr.success('Votre annonce a été crée ! Elle est maintenant en attente de validation.');
                    }).catch(function (err) {
                        toastr.error('Une erreur est survenue.');
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
    });
