'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var nodemailer = require('nodemailer');
var async = require('async');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var mongoose = require('mongoose');
var Ad = mongoose.model('Ad');
var Pos = mongoose.model('Pos');
var uuid = require('node-uuid');

var validationError = function(res, err) {
    return res.json(422, err);
};

exports.newsletter = function (req, res) {
    var transporter = nodemailer.createTransport();

    User.find({}, function (err, users) {
        if (err) {return res.send(500, err);}
        if (!users) {return res.send(404);}

        async.each(users, function (item) {
            transporter.sendMail({
                from: 'test@test.com',
                to: item.email,
                subject: req.body.subject,
                text: req.body.content
            }, function (err, info) {

            });
        });

        return res.send(200, users);
    });

};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function (req, res) {
    User.find({}, '-salt -hashedPassword', function (err, users) {
        if(err) return res.send(500, err);
        res.json(200, users);
    });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
    var newUser = new User(req.body);

    newUser.provider = 'local';
    newUser.role = 'user';
    newUser.tokenRegistration = uuid.v4();
    newUser.save(function (err, user) {
        if (err) return validationError(res, err);

        var transporter = nodemailer.createTransport();

        transporter.sendMail({
            from: 'noreply@thehomepass.com',
            to: 'valentin.rebierre@gmail.com',
            subject: 'test',
            text: 'http://localhost:9000/user/validate/' + user.tokenRegistration,
        }, function (err, info) {
            console.log(err)
            console.log(info)
        });
        var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
        res.json({ token: token });
    });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
    var userId = req.params.id;

    User.findById(userId, function (err, user) {
        if (err) return next(err);
        if (!user) return res.send(401);

        res.json(user.profile);
    });
};

exports.createAdmin = function (req, res) {
    if (!_.isString(req.body.email)) {
        return res.send(500, 'Bad email address.');
    }
    if (!_.isString(req.body.name)) {
        return res.send(500, 'Bad user name.');
    }
    if (!_.isString(req.body.pass)) {
        return res.send(500, 'Bad pass.');
    }

    var user = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        from: req.body.from,
        to: req.body.to,
        role: 'user',
        provider: 'local',
        password: req.body.pass,
        pass: req.body.pass
    };

    User.create(user, function (err, user) {
        if (err) {return res.send(500, err);}

        return res.send(200, user);
    })
};

exports.listAdmin = function (req, res) {
    User.find({}, '-salt -hashedPassword', function (err, users) {
        if(err) return res.send(500, err);
        res.json(200, users);
    });
};

exports.updateAdmin = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {return res.send(500, err);}

        user.name = req.body.name;
        user.phone = req.body.phone;
        user.email = req.body.email;
        user.from = req.body.from;
        user.to = req.body.to;

        user.save(function (err, user) {
            if (err) {return res.send(500, err);}

            return res.send(200, user);
        })
    });
};

exports.deleteAdmin = function (req, res) {
    User.findByIdAndRemove(req.params.id, function(err, user) {
        if(err) return res.send(500, err);
        return res.send(204);
    });
};

exports.updateTo = function (req, res) {
    var user = req.user;

    user.to.address = req.body.address;
    user.to.latitude = req.body.latitude;
    user.to.longitude = req.body.longitude;
    user.save(function (err, user) {
        if (err) {return res.send(500, err);}

        return res.send(200, user);
    });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    console.log(user)
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};

exports.like = function (req, res) {
    Ad.findById(req.body.ad, function (err, ad) {
        if (err) {return res.send(500, err);}

        Pos.findById(req.body.pos, function (err, pos) {
            if (err) {return res.send(500, err);}

            var like = {
                ad: ad._id,
                pos: pos._id
            };

            _.forEach(req.user.likes, function (item) {
                if (item.ad.equals(ad._id)) {
                    return res.send(500, 'Already exist.')
                }
            });

            if (!_.isArray(req.user.likes)) {
                req.user.likes = [];
            }

            req.user.likes.push(like);
            req.user.save(function (err, user) {
                if (err) {return res.send(500, err);}

                return res.send(201, req.user.likes);
            });
        });
    });
};

exports.removeLike = function (req, res) {
    var likes = _.filter(req.user.likes, function (item) {
        if (item.ad.equals(req.params.id)) {
            return false;
        }
        else {
            return true;
        }
    });

    if (likes.length !== req.user.likes.length - 1) {
        return res.send(404);
    }

    req.user.likes = likes;
    req.user.save(function (err, user) {
        if (err) {return res.send(500, err);}

        return res.send(204);
    });
};
