'use strict';

import User from './user.model';
import UserApplication from './user-application.model';
import config from '../../config/environment';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

/**
 * Get list of user applications
 */
export function index(req, res) {
  UserApplication.findOneAsync({userId: req.user._id})
    .then(userApps => {
      if(userApps){
        respondWithResult(res, 200)(userApps.applications);
      }else{
        respondWithResult(res, 200)([]);
      }
    })
    .catch(handleError(res));
}

/**
 * Creates a new user application
 */
export function create(req, res, next) {
  UserApplication.findOneAsync({userId: req.params.userId})
    .then(userApps => {
      if(!userApps){
        var userApps = new UserApplication();
        userApps.userId = req.params.userId;
      }
      var appIndex = -1;
      userApps.applications.forEach(function(app, index){
        if(app.applicationId == req.params.applicationId){
          appIndex = index;
          return;
        }
      });
      if(appIndex > -1){
        userApps.applications[appIndex].dateUpdated = new Date();
      }else{
        var userApp = {};
        userApp.applicationId = req.params.applicationId;
        userApp.dateInstalled = new Date();
        userApp.dateUpdated = new Date();
        userApp.appVersion = req.body.version;
        userApps.applications.push(userApp);
      }
      userApps.saveAsync()
        .then(userApps => {
          respondWithResult(res, 201)(userApps);
        })
        .catch(handleError(res));
    })
    .catch(handleError(res));
}

/**
 * Get a single user App
 */
export function show(req, res, next) {
  var applicationId = req.params.applicationId;
  var userId = req.params.userId;

  UserApplication.findAsync({userId: userId})
    .then(handleEntityNotFound(res))
    .then(userApps => {
      if (userApps) {
        userApps.applications.forEach(function(app){
          if(app.applicationId == applicationId){
            respondWithResult(res, 200)(app);
            return;
          }
        });
        handleEntityNotFound(res)(null);
      }
    })
    .catch(err => next(err));
}

/**
 * Deletes a user app
 */
export function destroy(req, res) {
  var userId = req.params.userId;
  var applicationId = req.params.applicationId;

  UserApplication.findAsync({userId: userId})
    .then(handleEntityNotFound(res))
    .then(userApps => {
      if(userApps){
        userApps.applications.forEach(function(app, index){
          if(app.applicationId == applicationId){
            delete userApps.applications[index];
            userApps.saveAsync()
              .then(userApps => {
                respondWithResult(res, 204)(userApps);
              })
              .catch(handleError(res));
          }
        });
      }
    })
    .catch(handleError(res));
}

/**
 * Update user app
 */
export function update(req, res, next) {
  var userId = req.params.userId;
  var applicationId = req.params.applicationId;

  User.findAsync({userId: userId})
    .then(handleEntityNotFound(res))
    .then(userApps => {
      if(userApps){
        userApps.applications.forEach(function(app){
          if(app.applicationId == applicationId){
            app.dateUpdated = new Date();
            app.appVersion = req.body.version;
            userApps.saveAsync()
              .then(userApps => {
                respondWithResult(res, 204)(userApps);
              })
              .catch(handleError(res));
          }
        });
      }
    })
    .catch(handleError(res));
}
