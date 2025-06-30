import express from 'express';
import {
  getJobs,
  createJob,
  updateJob,
  deleteJob,getJobById,getallJobs,updateJobStatus
} from '../controller/jobController.js';

const router = express.Router();

router.get('/', getallJobs);
router.post('/jobsbyorg', getJobs);
router.post('/', createJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);
router.get('/:id', getJobById); 

router.post('/updatestatus', updateJobStatus); 
export default router;
