import { Tweet } from '../models/Tweet.js';
import { pgPool } from '../db/index.js';

// 🏠 GET /feed – Home feed (tweets from users you follow only)
export const getHomeFeed = async (req, res) => {
  const userId = req.user.userId;

  try {
    // 1. Get followed user IDs (Postgres)
    const result = await pgPool.query(
      `SELECT followee_id FROM followers WHERE follower_id = $1`,
      [userId]
    );

    const followedIds = result.rows.map(row => row.followee_id);

    if (followedIds.length === 0) {
      return res.status(200).json([]); // No feed if not following anyone
    }

    // 2. Fetch tweets from followed users (MongoDB)
    const tweets = await Tweet.find({ author: { $in: followedIds } })
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json(tweets);
  } catch (error) {
    console.error('Error loading feed:', error);
    res.status(500).json({ message: 'Failed to load feed.' });
  }
};

// 👤 GET /users/:id/tweets – Tweets for public profile
export const getUserTweets = async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const tweets = await Tweet.find({ author: userId })
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json(tweets);
  } catch (error) {
    console.error('Error loading user tweets:', error);
    res.status(500).json({ message: 'Failed to load user tweets.' });
  }
};
