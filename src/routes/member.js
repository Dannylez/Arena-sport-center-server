import express from 'express';
import memberController from '../controllers/member.js';

const router = express.Router();

router
  .get('/', memberController.getAllMembers)
  .get('/:id', memberController.getMemberById)
  .post('/', memberController.createMember)
  .put('/:id', memberController.updateMember)
  .delete('/:id', memberController.deleteMember);

export default router;
