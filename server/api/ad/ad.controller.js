'use strict';

var _ = require('lodash');
var Ad = require('./ad.model');
var mongoose = require('mongoose');
var Pos = mongoose.model('Pos');
var Category = mongoose.model('Category');
var geolib = require('geolib');

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
        Pos.find({status: 'enabled'}, function (err, pos) {
            if (err) {return res.send(500, err);}
            var distance;
            var from = [];
            var to = [];

            if (req.user.from && req.user.from.latitude) {
                from = _.forEach(pos, function (item) {

                    distance = geolib.getDistance({
                        latitude: item.latitude,
                        longitude: item.longitude
                    }, {
                        latitude: req.user.from.latitude,
                        longitude: req.user.from.longitude
                    });

                    if (distance <= item.area)
                        _.without(pos, item);
                });
            }
            else if (req.user.to && req.user.to.latitude) {
                to = _.forEach(pos, function (item) {
                    distance = geolib.getDistance({
                        latitude: item.latitude,
                        longitude: item.longitude
                    }, {
                        latitude: req.user.to.latitude,
                        longitude: req.user.to.longitude
                    });

                    if (distance <= item.area)
                        _.without(pos, item);
                });
            }

            pos = _.union(from, to);

            Ad.find({pos: {$in: pos}}, function (err, ads) {
                if(err) {return res.send(500, err);}

                return res.json(200, ads);
            });
        });
    }
};

// Get a single ad
exports.show = function(req, res) {
    Ad.findById(req.params.id, function (err, ad) {
        if(err) { return handleError(res, err); }
        if(!ad) { return res.send(404); }
        return res.json(ad);
    });
};

// Creates a new ad in the DB.
exports.create = function(req, res) {
    if (req.body.type !== 'percent' && req.body.type !== 'euro')
        return res.send(500, 'Bad type.');
    if (!_.isString(req.body.pos))
        return res.send(500, 'Bad POS.');

    Category.findById(req.body.category, function (err, category) {
        if (err) {return res.send(500, err);}
        if (!category) {return res.sent(404);}

        var tmp = req.body.pos.split(',');

        Pos.find({_id: {$in: tmp}}, function (err, pos) {
            if (err) {return res.send(500, err);}
            if (!pos) {return res.send(404);}
            // if (pos.author != req.user._id) {return res.send(403);}

            var ad = {
                pos: pos,
                author: req.user._id,
                image: req.body.image,
                info: req.body.info,
                type: req.body.type,
                valueType: req.body.valueType,
                value: req.body.value,
                category: category._id,
                area: req.body.area,
                start: req.body.start,
                end: req.body.end,
                exclu: req.body.exclu,
                status: 'pending'
            };

            Ad.create(ad, function(err, ad) {
                if(err) { return handleError(res, err); }
                    console.log(ad);
                return res.json(201, ad);
            });
        });
    });

};

// Updates an existing ad in the DB.
exports.update = function(req, res) {
    if (req.body._id) {delete req.body._id;}

    if (req.user.role === 'admin') {
        Ad.findById(req.params.id, function (err, ad) {
            if (err) {return res.send(500, err);}
            if (!ad) {return res.send(404, 'Not found.');}

            var updated = {
                category: req.body.category,
                state: req.body.states
            };

            ad = _.merge(updated, ad);
            ad.save(function (err) {
                if (err) {return res.send(500, err);}
                return res.json(200, ad);
            });
        });
    }
};

// Deletes a ad from the DB.
exports.destroy = function(req, res) {
    Ad.findById(req.params.id, function (err, ad) {
        if(err) { return handleError(res, err); }
        if(!ad) { return res.send(404); }
        ad.remove(function(err) {
            if(err) { return handleError(res, err); }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}
