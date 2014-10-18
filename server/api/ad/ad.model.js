'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var AdSchema = new Schema({
	name: String,
	address: String,
	info: String,
	active: Boolean,
	lat: Number,
	lng: Number,
	type: String,
	value: Number,
});

module.exports = mongoose.model('Ad', AdSchema);