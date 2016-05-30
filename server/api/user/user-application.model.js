'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var UserAppSchema = new mongoose.Schema({
  applicationId: String,
  dateInstalled: Date,
  dateUpdated: Date,
  appVersion: String
});

var UserApplicationSchema = new mongoose.Schema({
  userId: String,
  applications: [UserAppSchema]
});

export default mongoose.model('UserApplication', UserApplicationSchema);
