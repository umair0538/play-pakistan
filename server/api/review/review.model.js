'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ReviewSchema = new mongoose.Schema({
  reviewer: String,
  application: String,
  review: String,
  rating: Number,
  flagCount: Number,
  flaggedBy: [],
  likeCount: Number,
  likedBy: [],
  unlikeCount: Number,
  unlikedBy: [],
  dateReviewed: Date,
  dateUpdated: Date,
  device: String,
  version: String
});

export default mongoose.model('Review', ReviewSchema);
