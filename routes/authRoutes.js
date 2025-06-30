import express from 'express';
import { autoDetectLogin } from '../controller/authController.js';

const router = express.Router();

router.post('/auto-login', autoDetectLogin);

export default router;
