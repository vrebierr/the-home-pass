'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var PosSchema = new Schema({
	name: String,
	address: String,
	info: String,
	active: { type: Boolean, default: false },
	latitude: { type: Number, default: 0 },
	longitude: { type: Number, default: 0 },
	image: String,
	author: { type: Schema.Types.ObjectId, ref: 'User' },
	email: String,
	phone: String,
	fax: String,
	opening: String,
});

module.exports = mongoose.model('Pos', PosSchema);
