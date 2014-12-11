'use strict';

var _ = require('lodash');
var Ad = require('./ad.model');
var mongoose = require('mongoose');
var Pos = mongoose.model('Pos');
var Category = mongoose.model('Category');
var geolib = require('geolib');

exports.findByPos = function (req, res) {
    Ad.find({status: 'enabled', start: {$lt: new Date()}, end: {$gte: new Date()}, pos: req.params.id}, function (err, ads) {
        if (err) {return res.send(500, err);}

        return res.json(200, ads);
    });
}

exports.findByState = function (req, res) {
    Ad.find({status: req.params.state}, function (err, ads) {
        if (err) {return res.send(500, err);}

        return res.json(200, ads);
    });
};

// Get list of ads
exports.index = function(req, res) {
    if (req.user.role === 'admin') {
        Ad.find(function (err, ads) {
            if (err) {return res.send(500, err);}

            return res.send(200, ads);
        });
    }
    else if (req.user.role === 'advertiser') {
        Ad.find({author: req.user._id}, function (err, ads) {
            if (err) {return res.send(500, err);}

            return res.send(200, ads);
        });
    }
    else {
        Ad.find({status: 'enabled', start: {$lt: new Date()}, end: {$gte: new Date()}}, function (err, ads) {
            if (err) {return res.send(500, err);}

            return res.json(200, ads);
        });
    }
};

// Get a single ad
exports.show = function(req, res) {
    Ad.findById(req.params.id, function (err, ad) {
        if (err) {return res.send(500, err);}
        if (!ad) {return res.send(404);}
        return res.json(ad);
    });
};

// Creates a new ad in the DB.
exports.create = function(req, res) {
    if (req.body.valueType !== 'percent' && req.body.valueType !== 'euro')
        return res.send(500, 'Bad type.');
    if (!_.isString(req.body.pos))
        return res.send(500, 'Bad POS.');

    Category.findById(req.body.category, function (err, category) {
        if (err) {return res.send(500, err);}
        if (!category) {return res.send(404);}

        var tmp = req.body.pos.split(',');

        Pos.find({_id: {$in: tmp}, author: req.user._id}, function (err, pos) {
            if (err) {return res.send(500, err);}
            if (!pos) {return res.send(404);}

            var ad = {
                pos: pos,
                author: req.user._id,
                image: req.body.image,
                info: req.body.info,
                type: req.body.type,
                valueType: req.body.valueType,
                value: req.body.value,
                category: category._id,
                range: req.body.range * 1000,
                start: req.body.start,
                end: req.body.end,
                exclu: req.body.exclu || false
            };

            Ad.create(ad, function (err, ad) {
                if (err) {return res.send(500, err);}

                return res.json(201, ad);
            });
        });
    });
};

// Updates an existing ad in the DB.
exports.update = function (req, res) {
    if (req.body._id) {delete req.body._id;}

    if (req.user.role === 'admin') {
        Category.findById(req.body.category, function (err, category) {
            if (err) {return res.send(500, err);}
            if (!category) {return res.send(404);}

            Ad.findById(req.params.id, function (err, ad) {
                if (err) {return res.send(500, err);}
                if (!ad) {return res.send(404, 'Not found.');}
                if (!ad.author.equals(req.user._id) && req.user.role !== 'admin') {return res.send(403);}

                var updated = {
                    category: category._id,
                    status: req.body.status,
                    image: req.body.image,
                    info: req.body.info,
                    type: req.body.type,
                    valueType: req.body.valueType,
                    value: req.body.value,
                    range: req.body.range * 1000,
                    start: req.body.start,
                    end: req.body.end,
                    exclu: req.body.exclu || false
                };

                ad = _.merge(ad, updated);
                ad.save(function (err) {
                    if (err) {return res.send(500, err);}
                    return res.json(200, ad);
                });
            });
        });
    }
};

exports.destroy = function (req, res) {
    Ad.findById(req.params.id, function (err, ad) {
        if (err) {return res.send(500, err)}
        if (!ad) {return res.send(404);}
        if (!ad.author.equals(req.user._id) && req.user.role !== 'admin') {return res.send(403);}

        ad.remove(function(err) {
            if(err) {return res.send(500, err);}
            return res.send(204);
        });
    });
};
