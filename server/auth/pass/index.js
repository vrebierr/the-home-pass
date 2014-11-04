'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var router = express.Router();

router.post('/', function(req, res) {
    User.findOne({pass: req.body.pass}, function (err, user) {
        if (err) {return res.send(500);}
        if (!user) {return res.send(404);}
        if (!user.pass_auth(req.body.pass)) {return res.send(401);}

        var token = auth.signToken(user._id, user.role);
        return res.json({token: token});
    });
});

module.exports = router;
