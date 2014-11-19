'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.put('/to', auth.isAuthenticated(), controller.updateTo);

router.post('/admin/newsletter', auth.hasRole('admin'), controller.newsletter)
router.get('/admin', auth.hasRole('admin'), controller.listAdmin);
router.delete('/admin/:id', auth.hasRole('admin'), controller.deleteAdmin);
router.post('/admin', auth.hasRole('admin'), controller.createAdmin);
router.put('/admin/:id', auth.hasRole('admin'), controller.updateAdmin);

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);


module.exports = router;
