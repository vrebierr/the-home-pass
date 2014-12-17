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
        password: 'ad',
        pass: 'ad'
    }, {
        provider: 'pass',
        name: 'Pass',
        email: 'pass@pass.com',
        password: 'pass',
        pass: 'pass',
        from: {
            formatted_address: '50 Rue de Rivoli, 75004 Paris, France',
            latitude: 48.8567484,
            longitude: 2.35390469999993
        },
        to: {
            formatted_address: 'London, UK',
            latitude: 51.5073509,
            longitude: -0.12775829999998223
        }
    }, {
        provider: 'local',
        name: 'Demo 2 Test',
        email: 'asd@ad.com',
        password: 'DEMO2TEST',
        pass: 'DEMO2TEST',
        from: {
            formatted_address: 'Suresnes, France',
            latitude: 48.869798,
            longitude: 2.2190329999999676
        },
        to: {
            formatted_address: 'Senlis, France',
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
                    author: user._id,
                    email: 'contact@ikea.com',
                    phone: '01 46 95 14 56',
                    fax: '01 46 95 14 56',
                    opening: 'Du lundi au vendredi de 9h à 20h',
                    info: 'Habitat Suresnes est le le leader de la région en matière d\'ameublement'
                }, {
                    name: 'Ikea SURESNES',
                    address: 'Suresnes, France',
                    latitude: 48.88,
                    longitude: 2.217,
                    author: user._id,
                    email: 'contact@ikea.com',
                    phone: '01 46 95 14 56',
                    fax: '01 46 95 14 56',
                    opening: 'Du lundi au vendredi de 9h à 20h',
                    info: 'Ikea Suresnes est le le leader de la région en matière d\'ameublement'
                }, {
                    name: 'Ikea SENLIS',
                    address: 'Senlis, France',
                    latitude: 49.205164,
                    longitude: 2.583212,
                    author: user._id,
                    email: 'contact@ikea.com',
                    phone: '01 46 95 14 56',
                    fax: '01 46 95 14 56',
                    opening: 'Du lundi au vendredi de 9h à 20h',
                    info: 'Ikea Senlis est le le leader de la région en matière d\'ameublement'
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
                                value: 20,
                                valueType: 'percent',
                                status: 'enabled',
                                info: 'Habitat vous propose une réduction exclusive The Home Pass. -20% sur l\'ensemble de nos produits.'
                            }, {
                                pos: [pos[1]._id, pos[2]._id],
                                author: user._id,
                                start: new Date(),
                                end: new Date().setDate(new Date().getDate() + 1),
                                range: 5000,
                                value: 50,
                                valueType: 'euro',
                                status: 'enabled',
                                info: 'Ikea vous propose une réduction exclusive The Home Pass. -50 euros sur l\'ensemble de nos produits.'
                            }, {
                                pos: pos[0]._id,
                                author: user._id,
                                start: new Date(),
                                end: new Date().setDate(new Date().getDate() + 1),
                                range: 5000,
                                value: 30,
                                valueType: 'euro',
                                status: 'enabled',
                                info: 'Habitat vous propose une réduction exclusive The Home Pass. -20% sur l\'ensemble de nos produits.'
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
