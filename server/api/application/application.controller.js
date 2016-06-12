/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/applications              ->  index
 * POST    /api/applications              ->  create
 * GET     /api/applications/:id          ->  show
 * PUT     /api/applications/:id          ->  update
 * DELETE  /api/applications/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Application from './application.model';
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

// Gets a list of Applications
export function index(req, res) {
  Application.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Application from the DB
export function show(req, res) {
  Application.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Application in the DB
export function create(req, res) {
  Application.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Application in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Application.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Application from the DB
export function destroy(req, res) {
  Application.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Gets a list of application Reviews
export function applicationReviews(req, res) {
  var query = {application: req.params.id};
  if(req.query.userId)
    query.reviewer = req.query.userId;
  Review.findAsync(query)
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single application Review from the DB
export function applicationReview(req, res) {
  Review.findByIdAsync(req.params.reviewId)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new application Review in the DB
export function createReview(req, res) {
  Review.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing application Review in the DB
export function updateReview(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Review.findByIdAsync(req.params.reviewId)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes an application Review from the DB
export function destroyReview(req, res) {
  Review.findByIdAsync(req.params.reviewId)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Gets top free applications
export function topFree(req, res) {
  Application.findAsync({paid: false}, {}, {sort: {weekNumber: -1, weekDownloads: -1}, limit: 7})
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets top paid applications
export function topPaid(req, res) {
  Application.findAsync({paid: true}, {}, {sort: {weekNumber: -1, weekDownloads: -1}, limit: 7})
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets top new applications
export function topNew(req, res) {
  Application.findAsync({}, {}, {sort: {age: 1, weekDownloads: -1}, limit: 7})
    .then(respondWithResult(res))
    .catch(handleError(res));
}
