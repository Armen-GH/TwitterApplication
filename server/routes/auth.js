import { Router } from 'express';
import { signup } from '../controllers/authController.js';

const router = Router();

// POST /api/v1/auth/signup
router.post('/signup', signup);

export default router;
