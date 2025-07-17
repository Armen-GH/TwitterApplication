// server/routes/userRoutes.js
import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  changeUserPassword
} from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/users/:id', authMiddleware, getUserProfile);
router.put('/users/:id', authMiddleware, updateUserProfile);
router.put('/users/:id/password', authMiddleware, changeUserPassword);

export default router;
