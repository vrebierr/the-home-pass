'use strict';

var _ = require('lodash');
var Like = require('./like.model');


exports.index = function (req, res) {
    Like.find({user: req.user._id}, function (err, likes) {
        if (err) {return res.send(500, err);}
        return res.json(200, likes);
    });
};

exports.show = function (req, res) {
    Like.findOne({user: req.user._id, _id: req.params.id}, function (err, like) {
        if (err) {return res.send(500, err);}
        if (!like) {return res.send(404);}
        return res.json(like);
    });
};

exports.create = function (req, res) {
    Ad.findById(req.body.ad, function (err, ad) {
        if (err) {return res.send(500, err);}
        if (!ad) {return res.send(404);}

        var like = {
            user: req.user._id,
            ad: ad
        };

        Like.create(like, function (err, like) {
            if (err) {return res.send(500, err);}
            return res.json(201, like);
        });
    })
};

exports.destroy = function (req, res) {
    Like.findById(req.params.id, function (err, like) {
        if (err) {return res.send(500, err);}
        if (!like) {return res.send(404);}
        if (!like.user.equals(req.user._id) && req.user.role !== 'admin') {return res.send(403);}

        like.remove(function(err) {
            if (err) {return res.send(500, err);}
            return res.send(204);
        });
    });
};
