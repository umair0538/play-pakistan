'use strict';

var express = require('express');
var controller = require('./application.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

//application reviews
router.get('/:id/reviews/', controller.applicationReviews);
router.get('/:id/reviews/:reviewId', controller.applicationReview);
router.post('/:id/reviews/', controller.createReview);
router.put('/:id/reviews/:reviewId', controller.updateReview);
router.patch('/:id/reviews/:reviewId', controller.updateReview);
router.delete('/:id/reviews/:reviewId', controller.destroyReview);

module.exports = router;
