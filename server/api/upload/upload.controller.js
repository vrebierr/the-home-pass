'use strict';

var _ = require('lodash');
var Upload = require('./upload.model');
var fs = require('fs');
var uuid = require('node-uuid');
var gm = require('gm');

exports.upload = function (req, res) {
    var tmp = req.files.file.path.split('.');
    var extension = tmp[tmp.length - 1];
    var available_extensions = ['jpg', 'png', 'jpeg', 'bmp', 'gif'];

    if (!_.contains(available_extensions, extension))
        return res.send(500, 'Invalid file extension.');

    fs.readFile(req.files.file.path, function (err, data) {
        if (err) {return res.send(500, err);}

        var name = uuid.v1() + '.' + extension;
        var path = 'client/uploads/' + name;

        fs.exists('client/uploads/', function (exists) {
            if (!exists) {
                fs.mkdir('client/uploads/', '0755', function () {
                    fs.writeFile(path, data, function (err) {
                        if (err) {return res.send(500, err);}
                        console.log(path);
                        gm(path).resize(240, 240).write('client/uploads/test.jpg', function (err) {
                            if (err) {console.log(err)}
                            console.log('done')
                        });
                        Upload.create({
                            path: name
                        }, function (err, upload) {
                            if (err) {return res.send(500, err);}

                            return res.json(201, upload);
                        });
                    });
                });
            }
            else {
                fs.writeFile(path, data, function (err) {
                    if (err) {return res.send(500, err);}
                    Upload.create({
                        path: name
                    }, function (err, upload) {
                        if (err) {return res.send(500, err);}

                        return res.json(201, upload);
                    });
                });
            }
        })

    })
}

// Get list of uploads
exports.index = function (req, res) {
    Upload.find(function (err, uploads) {
        if (err) {return res.send(500 ,err);}
        return res.json(200, uploads);
    });
};

// Get a single upload
exports.show = function (req, res) {
    Upload.findById(req.params.id, function (err, upload) {
        if (err) {return res.send(500, err);}
        if (!upload) {return res.send(404);}
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
