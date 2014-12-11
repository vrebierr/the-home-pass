/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Slide = require('./slide.model');

exports.register = function(socket) {
  Slide.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Slide.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('slide:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('slide:remove', doc);
}