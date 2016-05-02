'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ApplicationMediaSchema = new mongoose.Schema({
  type: String,
  file: String,
  uploader: String,
  createdOn: Date
});

export default ApplicationMediaSchema;
