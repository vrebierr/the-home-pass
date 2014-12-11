'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UploadSchema = new Schema({
	path: String,
});

module.exports = mongoose.model('Upload', UploadSchema);
