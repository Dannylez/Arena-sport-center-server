import express from 'express';
import paymentController from '../controllers/payment.js';

const router = express.Router();

router
  .get('/', paymentController.getAllPayments)
  .get('/:id', paymentController.getPaymentById)
  .post('/', paymentController.createPayment)
  .put('/:id', paymentController.updatePayment)
  .delete('/:id', paymentController.deletePayment);

export default router;
