'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PosSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Pos', PosSchema);