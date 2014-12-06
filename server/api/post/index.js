'use strict';

var express = require('express');
var controller = require('./post.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/tag/:id', controller.findByTag);
router.get('/slug/:slug', controller.findBySlug);
router.get('/admin', auth.hasRole('admin'), controller.indexAdmin);

router.get('/', controller.index);
router.get('/:id', auth.hasRole('admin'), controller.show);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
