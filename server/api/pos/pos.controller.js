'use strict';

var _ = require('lodash');
var Pos = require('./pos.model');
var geolib = require('geolib');

// Get list of poss
exports.index = function(req, res) {
    if (req.user.role === 'advertiser') {
        Pos.find({author: req.user._id}, function (err, pos) {
            if (err) {return res.send(500, err);}

            return res.send(200, pos);
        });
    }
    else {
        Pos.find(function (err, pos) {
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
            if (req.user.to && req.user.to.latitude) {
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

            return res.json(200, pos);
        });
    }
};

// Get a single pos
exports.show = function(req, res) {
  Pos.findById(req.params.id, function (err, pos) {
    if(err) { return handleError(res, err); }
    if(!pos) { return res.send(404); }
    return res.json(pos);
  });
};

// Creates a new pos in the DB.
exports.create = function(req, res) {
    if (!_.isNumber(req.body.latitude) || !_.isNumber(req.body.longitude))
        return res.send(500, 'Bad coordinates.');

    var pos = {
        author: req.user._id,
        address: req.body.address,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        image: req.body.image,
        name: req.body.name,
        info: req.body.info
    };

    Pos.create(pos, function(err, pos) {
        if(err) { return handleError(res, err); }
        return res.json(201, pos);
    });
};

// Updates an existing pos in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Pos.findById(req.params.id, function (err, pos) {
    if (err) { return handleError(res, err); }
    if(!pos) { return res.send(404); }
    var updated = _.merge(pos, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, pos);
    });
  });
};

// Deletes a pos from the DB.
exports.destroy = function(req, res) {
  Pos.findById(req.params.id, function (err, pos) {
    if(err) { return handleError(res, err); }
    if(!pos) { return res.send(404); }
    pos.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
