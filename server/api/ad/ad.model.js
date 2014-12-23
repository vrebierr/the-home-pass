'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    uuid = require('node-uuid');

var AdSchema = new Schema({
    pos: [{ type: Schema.Types.ObjectId, ref: 'Pos' }],
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    num: {type: String, default: uuid.v4().split('-')[0]},
    image: String,
    type: String,
    valueType: {type: String, default: 'percent'},
    value: {type: Number, default: 0},
    info: {type: String, default: ''},
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    range: {type: Number, default: 0},
    start: Date,
    end: Date,
    exclu: {type: Boolean, default: false},
    status: {type: String, default: 'pending'},
    createdAt: {type: Date, default: new Date()}
});

module.exports = mongoose.model('Ad', AdSchema);
