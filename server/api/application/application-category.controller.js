'use strict';

import _ from 'lodash';
import Application from './application.model';
import Category from './application-category.model';
import Review from '../review/review.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
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

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of categories
export function index(req, res) {
  Category.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a category by id
export function show(req, res) {
  var categoryId = req.params.categoryId;
  Category.findByIdAsync(categoryId)
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of applications inside a category
export function getCategoryApps(req, res) {
  Application.findAsync({category: req.params.categoryId})
    .then(respondWithResult(res))
    .catch(handleError(res));
}
