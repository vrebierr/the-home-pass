'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var PosSchema = new Schema({
	name: {type: String, default: ''},
	address: {type: String, default: ''},
	info: {type: String, default: ''},
	active: { type: Boolean, default: false },
	latitude: { type: Number, default: 0 },
	longitude: { type: Number, default: 0 },
	image: {type: String, default: ''},
	author: { type: Schema.Types.ObjectId, ref: 'User' },
	email: {type: String, default: ''},
	phone: {type: String, default: ''},
	fax: {type: String, default: ''},
	opening: {type: String, default: ''},
	website: {type: String, default: ''}
});

module.exports = mongoose.model('Pos', PosSchema);
