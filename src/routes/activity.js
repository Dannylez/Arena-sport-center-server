import express from 'express';
import activityController from '../controllers/activity.js';

const router = express.Router();

router
  .get('/', activityController.getAllActivities)
  .post('/', activityController.createActivity)
  .delete('/:id', activityController.deleteActivity);

export default router;
