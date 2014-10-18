'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UploadSchema = new Schema({
	link: String,
});

module.exports = mongoose.model('Upload', UploadSchema);