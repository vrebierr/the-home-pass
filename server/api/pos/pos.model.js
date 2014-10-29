'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var PosSchema = new Schema({
	name: String,
	address: String,
	info: String,
	active: Boolean,
	latitude: Number,
	longitude: Number,
	image: String,
	author: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Pos', PosSchema);
