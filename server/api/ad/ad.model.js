'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var AdSchema = new Schema({
	pos: { type: Schema.Types.ObjectId, ref: 'Pos' },
	image: String,
	type: String,
	value: Number,
});

module.exports = mongoose.model('Ad', AdSchema);
