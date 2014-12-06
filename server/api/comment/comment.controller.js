'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Comment = require('./comment.model');
var Post = require('../post/post.model');

// Get list of comments
exports.index = function(req, res) {
    Comment.find(function (err, comments) {
        if (err) {return res.send(500, err);}

        return res.json(200, comments);
    });
};

exports.findByPost = function (req, res) {
    Comment.find({target: req.params.id}, function (err, comments) {
        if (err) {return res.send(500, err);}

        return res.json(200, comments);
    });
};

// Get a single comment
exports.show = function(req, res) {
    Comment.findById(req.params.id, function (err, comment) {
        if (err) {return res.send(500, err);}
        if (!comment) {return res.send(404);}

        return res.json(comment);
    });
};

exports.create = function(req, res) {
    Post.findById(req.body.post, function (err, post) {
        var comment = {
            content: req.body.content,
            author: req.user._id,
            target: post
        };

        Comment.create(comment, function(err, comment) {
            if(err) {return res.send(500, err);}
            return res.json(201, comment);
        });
    });
};

exports.update = function(req, res) {
    if (req.body._id) {delete req.body._id;}

    Comment.findById(req.params.id, function (err, comment) {
        if (err) {return res.send(500, err);}
        if (!comment) {return res.send(404);}
        if (!comment.author.equals(req.user._id) && req.user.role !== 'admin') {return res.send(403);}

        var tmp = {
            content: req.body.content,
            updatedAt: new Date()
        };

        var updated = _.merge(comment, tmp);
        updated.save(function (err) {
            if (err) { return handleError(res, err); }
            return res.json(200, comment);
        });
    });
};

// Deletes a comment from the DB.
exports.destroy = function(req, res) {
    Comment.findById(req.params.id, function (err, comment) {
        if (err) {return res.send(500, err);}
        if (!comment) {return res.send(404);}
        comment.remove(function(err) {
            if (err) {return res.send(500, err);}
            return res.send(204);
        });
    });
};
