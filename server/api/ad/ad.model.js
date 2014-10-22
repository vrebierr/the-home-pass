'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var AdSchema = new Schema({
	pos: { type: Schema.Types.ObjectId, ref: 'Pos' },
	author: { type: Schema.Types.ObjectId, ref: 'User' },
	image: String,
	type: String,
	value: Number,
	category: { type: Schema.Types.ObjectId, ref: 'Category' }
});

module.exports = mongoose.model('Ad', AdSchema);
