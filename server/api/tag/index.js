'use strict';

var express = require('express');
var controller = require('./tag.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/name/:name', controller.findByName);

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
