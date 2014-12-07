'use strict';

var _ = require('lodash');
var Pos = require('./pos.model');
var geolib = require('geolib');

exports.index = function (req, res) {
    if (req.user.role === 'advertiser') {
        Pos.find({author: req.user._id}, function (err, pos) {
            if (err) {return res.send(500, err);}

            return res.send(200, pos);
        });
    }
    else {
        Pos.find(function (err, pos) {
            if (err) {return res.send(500, err);}

            return res.json(200, pos);
        });
    }
};

exports.show = function (req, res) {
    Pos.findById(req.params.id, function (err, pos) {
        if (err) {return res.send(500, err);}
        if (!pos) {return res.send(404);}
        return res.json(pos);
    });
};

exports.create = function (req, res) {
    if (!_.isNumber(req.body.latitude) || !_.isNumber(req.body.longitude))
        return res.send(500, 'Bad coordinates.');

    var pos = {
        author: req.user._id,
        address: req.body.address,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        image: req.body.image,
        name: req.body.name,
        info: req.body.info,
        email: req.body.email,
        phone: req.body.phone,
        fax: req.body.fax,
        opening: req.body.opening,
        website: req.body.website
    };

    Pos.create(pos, function(err, pos) {
        if(err) { return handleError(res, err); }
        return res.json(201, pos);
    });
};

exports.update = function (req, res) {
    if(req.body._id) { delete req.body._id; }

    Pos.findById(req.params.id, function (err, pos) {
        if (err) {return res.send(500, err);}
        if (!pos) {return res.send(404);}
        if (!pos.author.equals(req.user._id) && req.user.role !== 'admin') {return res.send(403);}

        var tmp = {
            address: req.body.address,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            image: req.body.image,
            name: req.body.name,
            info: req.body.info,
            email: req.body.email,
            phone: req.body.phone,
            fax: req.body.fax,
            opening: req.body.opening,
            website: req.body.website
        };

        var updated = _.merge(pos, tmp);
        updated.save(function (err) {
            if (err) {return res.send(500, err);}
            return res.json(200, pos);
        });
    });
};

exports.destroy = function(req, res) {
    Pos.findById(req.params.id, function (err, pos) {
        if (err) {return res.send(500, err);}
        if (!pos) {return res.send(404);}
        if (!pos.author.equals(req.user._id) && req.user.role !== 'admin') {return res.send(403);}

        pos.remove(function (err) {
            if(err) {return res.send(500, err);}
            return res.send(204);
        });
    });
};
