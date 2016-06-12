'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var CategorySchema = new mongoose.Schema({
  _id: String,
  name: String,
  description: String,
  createdOn: Date,
  lastUpdated: Date,
  subCategories: []
});

export default mongoose.model('Category', CategorySchema);
