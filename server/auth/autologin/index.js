'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var router = express.Router();

router.post('/', auth.hasRole('admin'), function(req, res) {
    console.log(req.body);
    User.findOne({_id: req.body._id}, function (err, user) {
        if (err) {return res.send(500);}
        if (!user) {return res.send(404);}

        var token = auth.signToken(user._id, user.role);
        return res.json({token: token});
    });
});

module.exports = router;
