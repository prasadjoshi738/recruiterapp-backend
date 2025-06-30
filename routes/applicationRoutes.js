import express from 'express';
import {
  getApplications,
  createApplication,
  updateApplicationStatus
} from '../controller/applicationController.js';

const router = express.Router();

router.get('/', getApplications);
router.post('/', createApplication);
router.put('/:id', updateApplicationStatus);

export default router;
