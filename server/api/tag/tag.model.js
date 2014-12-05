'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TagSchema = new Schema({
    name: {type: String, unique: true, default: ''},
});

module.exports = mongoose.model('Tag', TagSchema);
