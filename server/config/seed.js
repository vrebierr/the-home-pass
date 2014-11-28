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
        provider: 'pass',
        name: 'SURESNES',
        email: '',
        password: 'SURESNES',
        pass: 'SURESNES',
        from: {
            address: 'Suresnes, France',
            latitude: 48.869798,
            longitude: 2.2190329999999676
        },
        to: {
            address: '50 Rue de Rivoli, 75004 Paris, France',
            latitude: 48.8567484,
            longitude: 2.35390469999993
        }
    }, function () {
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

Pos.find({}).remove(function() {
    User.findOne({name: 'ad'}, function (err, user) {
        Pos.create({
            name: 'Habitat'
        }, function () {
            console.log('finished populating pos');
        })
    })
});
Ad.find({}).remove(function() {});
