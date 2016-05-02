'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ApplicationPermissionSchema = new mongoose.Schema({
  name: String,
  permission: String
});

export default ApplicationPermissionSchema;
