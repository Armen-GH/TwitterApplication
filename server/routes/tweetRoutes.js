import express from 'express';
import { createTweet, getTweets, retweet, replyToTweet } from '../controllers/tweetController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// POST a tweet (protected)
router.post('/tweets', authMiddleware, createTweet);
router.post('/tweets/retweet', authMiddleware, retweet);
router.post('/tweets/reply', authMiddleware, replyToTweet);

// GET all tweets (protected for now, you can remove authMiddleware if you want it public)
router.get('/tweets', authMiddleware, getTweets);

export default router;
