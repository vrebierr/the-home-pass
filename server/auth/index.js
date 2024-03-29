'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../config/environment');
var User = require('../api/user/user.model');

// Passport Configuration
require('./local/passport').setup(User, config);

var router = express.Router();

router.use('/local', require('./local'));
router.use('/pass', require('./pass'));
router.use('/autologin', require('./autologin'));

module.exports = router;
