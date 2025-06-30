import express from 'express';
import {
  registerOrg,
  loginOrg,
  getAllOrgs,
  approveOrg
} from '../controller/orgController.js';

const router = express.Router();

router.post('/register', registerOrg);
router.post('/login', loginOrg);
router.get('/', getAllOrgs); // for admin
router.put('/approve/:id', approveOrg); // admin approval

export default router;
