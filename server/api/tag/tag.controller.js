'use strict';

var _ = require('lodash');
var Tag = require('./tag.model');
var slug = require('slug');

exports.findByName = function (req, res) {
    Tag.findOne({slug: req.params.name}, function (err, tag) {
        if (err) {return res.send(500, err);}
        if (!tag) {return res.send(404);}

        return res.send(200, tag);
    });
};

// Get list of tags
exports.index = function(req, res) {
  Tag.find(function (err, tags) {
    if(err) { return handleError(res, err); }
    return res.json(200, tags);
  });
};

// Get a single tag
exports.show = function(req, res) {
  Tag.findById(req.params.id, function (err, tag) {
    if(err) { return handleError(res, err); }
    if(!tag) { return res.send(404); }
    return res.json(tag);
  });
};

// Creates a new tag in the DB.
exports.create = function(req, res) {
    if (!_.isString(req.body.name)) {
        return res.send(500, 'Bad name.');
    }

    var tag = {
        name: req.body.name,
        slug: slug(req.body.name)
    };

    Tag.create(tag, function(err, tag) {
        if (err) {return res.send(500, err);}
        return res.json(201, tag);
    });
};

// Updates an existing tag in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Tag.findById(req.params.id, function (err, tag) {
    if (err) { return handleError(res, err); }
    if(!tag) { return res.send(404); }
    var updated = _.merge(tag, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, tag);
    });
  });
};

// Deletes a tag from the DB.
exports.destroy = function(req, res) {
  Tag.findById(req.params.id, function (err, tag) {
    if(err) { return handleError(res, err); }
    if(!tag) { return res.send(404); }
    tag.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
