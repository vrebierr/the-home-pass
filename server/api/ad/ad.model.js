'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AdSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  lat: Number,
  lng: Number,
});

module.exports = mongoose.model('Ad', AdSchema);