import express from 'express';
import classController from '../controllers/class.js';

const router = express.Router();

router
  .get('/', classController.getAllClasses)
  .get('/:id', classController.getClassById)
  .post('/', classController.createClass)
  .put('/:id', classController.updateClass)
  .delete('/:id', classController.deleteClass);

export default router;
