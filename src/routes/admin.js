import express from 'express';
import adminController from '../controllers/admin.js';

const router = express.Router();

router
  .get('/', adminController.getAllAdmins)
  .get('/:id', adminController.getAdminById)
  .post('/', adminController.createAdmin)
  .put('/:id', adminController.updateAdmin)
  .delete('/:id', adminController.deleteAdmin);

export default router;
