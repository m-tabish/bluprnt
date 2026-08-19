import express from 'express';
import { aiderController } from '../controllers/aider.controller.js';

const router = express.Router();

router.get('/api/aider', aiderController);

export default router;
