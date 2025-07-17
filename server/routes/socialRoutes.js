import express from 'express';
import {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  getSocialOverview
} from '../controllers/socialController.js';

import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Follow and unfollow require authentication
router.post('/users/:id/follow', authMiddleware, followUser);
router.post('/users/:id/unfollow', authMiddleware, unfollowUser);

// Fetch followers/following (can be public or protected, depending on your app design)
router.get('/users/:id/followers', authMiddleware, getFollowers);
router.get('/users/:id/following', authMiddleware, getFollowing);
router.get('/users/:id/social-overview', getSocialOverview);

export default router;
