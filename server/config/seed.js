/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Pos = require('../api/pos/pos.model');
var Ad = require('../api/ad/ad.model');
var Category = require('../api/category/category.model');


User.find({}).remove(function() {
    User.create({
        provider: 'local',
        name: 'Test User',
        email: 'test@test.com',
        password: 'test'
    }, {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@admin.com',
        password: 'admin'
    }, {
        provider: 'local',
        role: 'advertiser',
        name: 'Ad',
        email: 'ad@ad.com',
        password: 'ad'
    }, {
        provider: 'pass',
        name: 'Pass',
        email: 'pass@pass.com',
        password: 'pass',
        pass: 'pass',
        from: {
            address: '50 Rue de Rivoli, 75004 Paris, France',
            latitude: 48.8567484,
            longitude: 2.35390469999993
        },
        to: {
            address: 'London, UK',
            latitude: 51.5073509,
            longitude: -0.12775829999998223
        }
    }, {
        provider: 'local',
        name: 'SURESNES',
        email: 'asd@ad.com',
        password: 'SURESNES',
        pass: 'SURESNES',
        from: {
            address: 'Suresnes, France',
            latitude: 48.869798,
            longitude: 2.2190329999999676
        },
        to: {
            address: 'Senlis, France',
            latitude: 49.205164,
            longitude: 2.583212000000003
        }
    }, function () {
        Pos.find({}).remove(function() {
            User.findOne({email: 'ad@ad.com'}, function (err, user) {
                Pos.create({
                    name: 'Habitat SURESNES',
                    address: 'Suresnes, France',
                    latitude: 48.85,
                    longitude: 2.2187,
                    author: user._id
                }, {
                    name: 'Ikea SURESNES',
                    address: 'Suresnes, France',
                    latitude: 48.88,
                    longitude: 2.217,
                    author: user._id
                }, {
                    name: 'Ikea SENLIS',
                    address: 'Senlis, France',
                    latitude: 49.205164,
                    longitude: 2.583212,
                    author: user._id
                }, function () {
                    console.log('finished populating pos');

                    Ad.find({}).remove(function () {
                        Pos.find({}, function (err, pos) {
                            Ad.create({
                                pos: pos[0]._id,
                                author: user._id,
                                start: new Date(),
                                end: new Date().setDate(new Date().getDate() + 1),
                                range: 5000,
                                info: '',
                                value: 20,
                                valueType: 'percent',
                                status: 'enabled'
                            }, {
                                pos: [pos[1]._id, pos[2]._id],
                                author: user._id,
                                start: new Date(),
                                end: new Date().setDate(new Date().getDate() + 1),
                                range: 5000,
                                info: '',
                                value: 50,
                                valueType: 'euro',
                                status: 'enabled'
                            }, {
                                pos: pos[0]._id,
                                author: user._id,
                                start: new Date(),
                                end: new Date().setDate(new Date().getDate() + 1),
                                range: 5000,
                                info: '',
                                value: 30,
                                valueType: 'euro',
                                status: 'enabled'
                            }, function () {
                                console.log('finished populating ads');
                            });
                        });
                    });
                });
            })
        });
        console.log('finished populating users');
    });
});

Category.find({}).remove(function () {
    var categories = [];
    for (var i = 0; i < 20; i++) {
        categories.push({
            name: 'Categorie de test ' + i
        });
    }

    Category.create(categories, function () {
        console.log('finished populating categories');
    });
});
