'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
    content: {type: String, default: ''},
    post: {type: Schema.Types.ObjectId, ref: 'Post'},
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    createdAt: {type: Date, default: new Date()},
    updatedAt: {type: Date, default: new Date()}
});

module.exports = mongoose.model('Comment', CommentSchema);
