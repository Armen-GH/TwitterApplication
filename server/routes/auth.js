import { Router } from 'express';
import { signup, login } from '../controllers/authController.js';

const router = Router();

// POST /api/v1/auth/signup
router.post('/signup', signup);

// POST /api/v1/auth/login
router.post('/login', login);

export default router;
