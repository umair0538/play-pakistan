'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
import ApplicationMediaSchema from './applicationMedia.model'
import ApplicationPermissionSchema from './applicationPermission.model'
import ApplicationPriceSchema from './applicationPrice.model'

var ApplicationSchema = new mongoose.Schema({
  name: String,
  price: ApplicationPriceSchema,
  description: String,
  media: [ApplicationMediaSchema],
  version: String,
  developer: String,
  createdOn: Date,
  lastUpdated: Date,
  size: Number,
  downloads: Number,
  permissions: [ApplicationPermissionSchema],
  rating: Number,
  totalRating: Number,
  totalRatings: Number
});

export default mongoose.model('Application', ApplicationSchema);
