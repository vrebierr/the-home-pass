'use strict';

var express = require('express');
var controller = require('./slide.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.hasRolee('admin'), controller.create);
router.put('/:id', auth.hasRolee('admin'), controller.update);
router.patch('/:id', auth.hasRolee('admin'), controller.update);
router.delete('/:id', auth.hasRolee('admin'), controller.destroy);

module.exports = router;
