'use strict';

var express = require('express');
var controller = require('./upload.controller');
var multipart = require('connect-multiparty');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', multipart(), controller.upload);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;