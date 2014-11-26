'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var AdSchema = new Schema({
	pos: [{ type: Schema.Types.ObjectId, ref: 'Pos' }],
	author: { type: Schema.Types.ObjectId, ref: 'User' },
	image: String,
	type: String,
	valueType: String,
	value: Number,
	info: String,
	category: { type: Schema.Types.ObjectId, ref: 'Category' },
	area: Number,
	start: Date,
	end: Date,
	exclu: Boolean,
	status: String
});

module.exports = mongoose.model('Ad', AdSchema);
