'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = Schema({
  name: {type: String},
  caption: {type: String},
  imageURI: {type: String},
  objectKey: {type: String},
  userID: {type: Schema.Types.ObjectId},
  galleryID: { type: Schema.Types.ObjectId, required: true },
  created: {type: Date, default: Date.now},
});

module.exports = mongoose.model('photo', photoSchema);
