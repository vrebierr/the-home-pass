'use strict';

angular.module('theHomePassApp')
    .controller('AdminCtrl', function ($scope, ads, users) {
        var data_ads = [];
        var data_users = {
            users: [],
            advertisers: [],
            total: []
        };

        for (var i = 0; i < 12; i++) {
            var tmp = _.filter(ads, function (item) {
                if (item.status === 'enabled' || item.status === 'archived') {
                    var m = moment().startOf('year').add(i, 'month');
                    if (moment(item.start).month() <= m.month() && moment(item.end).month() >= m.month()) {
                        return true;
                    }
                    else {
                        return false
                    }
                }
            });

            var advertisers_tmp = 0;
            var users_tmp = 0;
            var total = 0;
            _.forEach(users, function (item) {
                var m = moment().startOf('year').add(i, 'month');
                if (moment(item.createdAt).month() === m.month()) {
                    if (item.role === 'advertiser') {
                        advertisers_tmp++;
                    }
                    else if (item.role === 'user') {
                        users_tmp++;
                    }
                    total++;
                }
            });
            data_ads.push(tmp.length);
            data_users.users.push(users_tmp);
            data_users.advertisers.push(advertisers_tmp);
            data_users.total.push(total);
        }

        $scope.config = {
            ads: {
                title: {text: 'Annonces'},
                subtitle: {text: 'Actuellement ' + data_ads[data_ads.length - 1] + ' annonces en ligne.'},
                options: {
                    char: {
                        type: 'line'
                    }

                },
                xAxis: {
                    categories: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Jui', 'Aou', 'Oct', 'Sep', 'Nov', 'Dec']
                },
                yAxis: {
                    title: {text: 'Annonces'},
                },
                series: [
                    {name: 'Annonces actives', data: data_ads}
                ]
            },
            users: {
                title: {text: 'Utilisateurs'},
                subtitle: {text: 'Actuellement ' + data_users.total[data_ads.length - 1] + ' utilisateurs inscris.'},
                options: {
                    char: {
                        type: 'line'
                    }

                },
                xAxis: {
                    categories: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Jui', 'Aou', 'Oct', 'Sep', 'Nov', 'Dec']
                },
                yAxis: {
                    title: {text: 'Utilisateurs'},
                },
                series: [
                    {name: 'Utilisateurs', data: data_users.users},
                    {name: 'Annonceurs', data: data_users.advertisers},
                    {name: 'Total', data: data_users.total},
                ]
            }
        };
    });
