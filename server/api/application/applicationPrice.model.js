'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ApplicationPriceSchema = new mongoose.Schema({
  currency: String,
  amount: Number
});

export default ApplicationPriceSchema;
