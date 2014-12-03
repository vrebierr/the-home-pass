'use strict';

angular.module('theHomePassApp')
    .controller('AdminCtrl', function ($scope, ads, users) {
        var data_ads = [];
        var data_users = [];

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

            var tmp_user = _.filter(users, function (item) {
                var m = moment().startOf('year').add(i, 'month');
                if (moment(item.createdAt).month() === m.month()) {
                    return true
                }
                else {
                    return false
                }
            });
            data_ads.push(tmp.length);
            data_users.push(tmp_user.length)
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
                subtitle: {text: 'Actuellement ' + data_users[data_ads.length - 1] + ' utilisateurs inscris.'},
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
                    {name: 'Utilisateurs inscris', data: data_users}
                ]
            }
        };
    });
