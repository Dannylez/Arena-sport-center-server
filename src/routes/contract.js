import express from 'express';
import contractController from '../controllers/contracts.js';

const router = express.Router();

router
  .get('/', contractController.getAllContracts)
  .get('/:id', contractController.getContractById)
  .post('/', contractController.createContract)
  .put('/:id', contractController.updateContract)
  .delete('/:id', contractController.deleteContract);

export default router;
