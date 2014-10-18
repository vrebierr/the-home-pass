'use strict';

var _ = require('lodash');
var Pos = require('./pos.model');

// Get list of poss
exports.index = function(req, res) {
  Pos.find(function (err, poss) {
    if(err) { return handleError(res, err); }
    return res.json(200, poss);
  });
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
  Pos.create(req.body, function(err, pos) {
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