'use strict';

var _ = require('lodash');
var Slide = require('./slide.model');

exports.index = function (req, res) {
    Slide.find(function (err, slides) {
        if (err) {return res.send(500, err);}
        return res.json(200, slides);
    });
};


exports.create = function (req, res) {
    Upload.findById(req.body.upload, function (err, upload) {
        if (err) { return res.send(500, err);}
        if (!upload) {return res.send(404);}

        var slide = {
            upload: upload,
            position: req.body.position
        };

        Slide.create(slide, function (err, slide) {
            if (err) {return res.send(500, err);}
            return res.json(201, slide);
        });
    });
};

exports.update = function (req, res) {
    if (req.body._id) { delete req.body._id; }
    Slide.findById(req.params.id, function (err, slide) {
        if (err) {return res.send(500, err);}
        if (!slide) {return res.send(404);}

        var updated = _.merge(slide, req.body);
        updated.save(function (err) {
            if (err) {return res.send(500, err);}
            return res.json(200, slide);
        });
    });
};

exports.destroy = function(req, res) {
    Slide.findById(req.params.id, function (err, slide) {
        if (err) {return res.send(500, err);}
        if (!slide) {return res.send(404);}

        slide.remove(function(err) {
            if(err) {return res.send(500, err);}
            return res.send(204);
        });
    });
};
