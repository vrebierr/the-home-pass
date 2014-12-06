'use strict';

var _ = require('lodash');
var slug = require('slug');
var Post = require('./post.model');
var mongoose = require('mongoose');
var Tag = mongoose.model('Tag');

exports.findByTag = function (req, res) {
    Tag.findById(req.params.id, function (err, tag) {
        if (err) {return res.send(500, err);}
        if (!tag) {return res.send(404);}

        Post.find({tags: req.params.id, state: 'published'}, function (err, posts) {
            if (err) {return res.send(500, err);}
            if (!posts) {return res.send(404);}

            return res.json(200, posts);
        });
    });
};

exports.findBySlug = function (req, res) {
    Post.findOne({slug: req.params.slug, state: 'published'}, function (err, post) {
        if (err) {return res.send(500, err);}
        if (!post) {return res.send(404);}

        return res.json(200, post);
    });
};

exports.index = function (req, res) {
    Post.find({state: 'published'}, function (err, posts) {
        if (err) {return res.send(500, err);}

        return res.json(200, posts);
    });
};

// Get list of posts
exports.indexAdmin = function (req, res) {
    Post.find(function (err, posts) {
        if (err) {return res.send(500, err);}

        return res.json(200, posts);
    });
};

// Get a single post
exports.show = function (req, res) {
    Post.findById(req.params.id, function (err, post) {
        if (err) {return res.send(500, err);}
        if (!post) {return res.send(404);}
        console.log(post)

        return res.json(200, post);
    });
};

// Creates a new post in the DB.
exports.create = function(req, res) {
    if (!_.isString(req.body.title)) {
        return res.send(500, 'Bad title');
    }

    if (_.isArray(req.body.tags)) {

        Tag.find({_id: {$in: req.body.tags}}, function (err, tags) {
            if (err) {return res.send(500, err);}

            var post = {
                title: req.body.title,
                slug: slug(req.body.title),
                content: req.body.content,
                enabled: req.body.enabled,
                tags: tags,
                state: req.body.state
            };

            Post.create(post, function(err, post) {
                if(err) {return res.send(500, err);}
                return res.json(201, post);
            });
        });
    }
    else {
        var post = {
            title: req.body.title,
            slug: slug(req.body.title),
            content: req.body.content,
            state: req.body.state,
            tags: null
        };

        Post.create(post, function(err, post) {
            if(err) {return res.send(500, err);}
            return res.json(201, post);
        });
    }
};

// Updates an existing post in the DB.
exports.update = function(req, res) {
    if(req.body._id) { delete req.body._id; }
    if (!_.isString(req.body.title)) {
        return res.send(500, 'Bad title');
    }

    Post.findById(req.params.id, function (err, post) {
        if (err) {return res.send(500, err)}
        if(!post) {return res.send(404);}

        if (_.isArray(req.body.tags)) {
            Tag.find({_id: {$in: req.body.tags}}, function (err, tags) {
                if (err) {return res.send(500, err);}

                var tmp = {
                    title: req.body.title,
                    slug: slug(req.body.title),
                    content: req.body.content,
                    state: req.body.state,
                    tags: tags
                };

                var updated = _.merge(post, tmp);
                updated.save(function (err, data) {
                    if (err) {return res.send(500, err);}
                    return res.json(200, data);
                });
            });
        }
        else {
            var tmp = {
                title: req.body.title,
                slug: slug(req.body.title),
                content: req.body.content,
                state: req.body.state,
                tags: null
            };

            var updated = _.merge(post, tmp);
            updated.save(function (err, data) {
                if (err) {return res.send(500, err);}
                return res.json(200, data);
            });
        }
    });
};

// Deletes a post from the DB.
exports.destroy = function(req, res) {
  Post.findById(req.params.id, function (err, post) {
    if(err) { return handleError(res, err); }
    if(!post) { return res.send(404); }
    post.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
