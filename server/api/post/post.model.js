'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: {type: String, default: ''},
    content: {type: String, default: ''},
    createdAt: {type: Date, default: new Date()},
    active: {type: Boolean, default: false},
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
});

module.exports = mongoose.model('Post', PostSchema);
