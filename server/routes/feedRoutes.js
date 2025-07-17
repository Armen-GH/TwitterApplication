import express from 'express';
import { getHomeFeed, getUserTweets } from '../controllers/feedController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/feed', authMiddleware, getHomeFeed);         // Requires login
router.get('/users/:id/tweets', getUserTweets);           // Public profile

export default router;
