'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
    name: {type: String, unique: true, default: ''},
});

module.exports = mongoose.model('Category', CategorySchema);
