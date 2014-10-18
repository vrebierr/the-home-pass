'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var AdSchema = new Schema({
	image: String,
	type: String,
	value: Number,
});

module.exports = mongoose.model('Ad', AdSchema);