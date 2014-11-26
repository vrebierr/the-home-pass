'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var AdSchema = new Schema({
	pos: [{ type: Schema.Types.ObjectId, ref: 'Pos' }],
	author: { type: Schema.Types.ObjectId, ref: 'User' },
	image: String,
	type: String,
	valueType: {type: String, default: 'percent'},
	value: {type: Number, default: 0},
	info: {type: String, default: ''},
	category: { type: Schema.Types.ObjectId, ref: 'Category' },
	area: {type: Number, default: 0},
	start: Date,
	end: Date,
	exclu: {type: Boolean, default: false},
	status: {type: String, default: 'pending'}
});

module.exports = mongoose.model('Ad', AdSchema);
