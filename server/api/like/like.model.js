'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LikeSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    ad: {type: Schema.Types.ObjectId, ref: 'Ad'},
    createdAt: {type: Date, default: new Date()}
});

module.exports = mongoose.model('Like', LikeSchema);
