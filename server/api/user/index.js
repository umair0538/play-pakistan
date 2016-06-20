'use strict';

import {Router} from 'express';
import * as controller from './user.controller';
import * as userApplicationController from './user-application.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
router.put('/:id', auth.isAuthenticated(), controller.updateProfile);

// user applications
router.get('/:userId/applications', auth.isAuthenticated(), userApplicationController.index);
router.delete('/:userId/applications/:applicationId', auth.isAuthenticated(), userApplicationController.destroy);
router.put('/:userId/applications/:applicationId', auth.isAuthenticated(), userApplicationController.update);
router.get('/:userId/applications/:applicationId', auth.isAuthenticated(), userApplicationController.show);
router.post('/:userId/applications/:applicationId', userApplicationController.create);

export default router;
