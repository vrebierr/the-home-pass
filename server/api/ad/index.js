'use strict';

var express = require('express');
var controller = require('./ad.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/state/:state', auth.hasRole('admin'), controller.findByState);

router.get('/pos/:id', auth.hasRole('user'), controller.findByPos);

router.get('/', auth.hasRole('user'), controller.index);
router.get('/:id', auth.hasRole('user'), controller.show);
router.post('/', auth.hasRole('advertiser'), controller.create);
router.put('/:id', auth.hasRole('advertiser'), controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
