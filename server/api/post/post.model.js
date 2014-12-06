'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: {type: String, default: '', unique: true},
    slug: {type: String, default: '', unique: true},
    content: {type: String, default: ''},
    createdAt: {type: Date, default: new Date()},
    updatedAt: {type: Date, default: new Date()},
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    state: {type: String, default: 'draft'}
});

module.exports = mongoose.model('Post', PostSchema);
