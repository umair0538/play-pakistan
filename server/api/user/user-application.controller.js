'use strict';

import User from './user.model';
import UserApplication from './user-application.model';
import Application from '../application/application.model';
import config from '../../config/environment';
import constants from '../../config/server-constants';

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
        var ids = [];
        userApps.applications.forEach(function(userApp){
          ids.push(userApp.applicationId);
        });
        Application.findAsync({_id: {$in: ids}})
          .then(apps => {
            respondWithResult(res, 200)(apps);
          })
          .catch(handleError(res));
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
  var firstDownload = false;
  Application.findByIdAsync(req.params.applicationId)
  .then(handleEntityNotFound(res))
  .then(application => {
    if(application){
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
            application.downloads += 1;
            application.age = Math.ceil((new Date() - application.createdOn) / constants.ageConstant);
            var weekNumber = Math.ceil((new Date() - constants.applicationStartDate) / constants.ageConstant);
            if(isNaN(application.weekNumber) || weekNumber > application.weekNumber)
              application.weekDownloads = 1;
            else
              application.weekDownloads += 1;
            application.weekNumber = weekNumber;
            firstDownload = true;
          }
          userApps.saveAsync()
            .then(userApps => {
              if(firstDownload){
                application.saveAsync()
                .then(application => {
                  respondWithResult(res, 201)(userApps);
                })
                .catch(handleError(res));
              }else{
                respondWithResult(res, 201)(userApps);
              }
            })
            .catch(handleError(res));
        })
        .catch(handleError(res));
    }
  })
  .catch(handleError(res));
}

/**
 * Get a single user App
 */
export function show(req, res, next) {
  var applicationId = req.params.applicationId;
  var userId = req.params.userId;

  UserApplication.findOneAsync({userId: userId})
    .then(handleEntityNotFound(res))
    .then(userApps => {
      if (userApps && userApps.applications) {
        userApps.applications.forEach(function(app){
          if(app.applicationId == applicationId){
            respondWithResult(res, 200)(app);
            return;
          }
        });
      }
      handleEntityNotFound(res)(null);
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
