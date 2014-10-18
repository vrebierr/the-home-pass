'use strict';

var _ = require('lodash');
var Upload = require('./upload.model');
var fs = require('fs');
var uuid = require('node-uuid');

exports.upload = function (req, res) {
    fs.readFile(req.files.file.path, function (err, data) {
        if (err) {res.send(500, res);}

        console.log(req.files.file.path);
    })
}

// Get list of uploads
exports.index = function(req, res) {
    Upload.find(function (err, uploads) {
        if(err) { return handleError(res, err); }
        return res.json(200, uploads);
    });
};

// Get a single upload
exports.show = function(req, res) {
    Upload.findById(req.params.id, function (err, upload) {
        if(err) { return handleError(res, err); }
        if(!upload) { return res.send(404); }
        return res.json(upload);
    });
};

// Updates an existing upload in the DB.
exports.update = function(req, res) {
    if(req.body._id) { delete req.body._id; }
    Upload.findById(req.params.id, function (err, upload) {
        if (err) { return handleError(res, err); }
        if(!upload) { return res.send(404); }
        var updated = _.merge(upload, req.body);
        updated.save(function (err) {
            if (err) { return handleError(res, err); }
            return res.json(200, upload);
        });
    });
};

// Deletes a upload from the DB.
exports.destroy = function(req, res) {
    Upload.findById(req.params.id, function (err, upload) {
        if(err) { return handleError(res, err); }
        if(!upload) { return res.send(404); }
        upload.remove(function(err) {
            if(err) { return handleError(res, err); }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}