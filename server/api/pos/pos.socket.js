/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Pos = require('./pos.model');

exports.register = function(socket) {
  Pos.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Pos.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('pos:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('pos:remove', doc);
}