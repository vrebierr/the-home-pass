'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SlideSchema = new Schema({
    upload: {type: Schema.Types.ObjectId, ref: 'Upload'},
    position: Number,
});

module.exports = mongoose.model('Slide', SlideSchema);
