import express from 'express';
import { getCandidates, updateCandidate, createCandidate } from '../controller/candidateController.js';
import { upload } from '../utils/upload.js';

const router = express.Router();

router.get('/', getCandidates);
router.put('/:id', updateCandidate);
router.post('/', upload.single('resume'), createCandidate);

export default router;
