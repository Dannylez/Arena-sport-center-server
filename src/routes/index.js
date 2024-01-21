import { Router } from 'express';
import activity from './activity.js';
import admin from './admin.js';
import classes from './class.js';
import member from './member.js';
import payment from './payment.js';
import trainer from './trainer.js';
import contract from './contract.js';
import auth from './auth.js';

const router = Router();

router.use('/activity', activity);
router.use('/admin', admin);
router.use('/class', classes);
router.use('/member', member);
router.use('/payment', payment);
router.use('/trainer', trainer);
router.use('/contract', contract);
router.use('/auth', auth);

export default router;
