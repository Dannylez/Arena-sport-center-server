import express from 'express';
import auth from '../controllers/auth.js';

const router = express.Router();

router.post('/', auth.login);
router.get('/', auth.verifyToken);

export default router;
