import express from 'express';
import trainerController from '../controllers/trainer.js';

const router = express.Router();

router
  .get('/', trainerController.getAllTrainers)
  .get('/:id', trainerController.getTrainerById)
  .post('/', trainerController.createTrainer)
  .put('/:id', trainerController.updateTrainer)
  .delete('/:id', trainerController.deleteTrainer);

export default router;
