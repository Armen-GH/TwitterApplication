import { pgPool } from '../db/index.js';

// POST /users/:id/follow
export const followUser = async (req, res) => {
  const followerId = req.user.userId;
  const followeeId = parseInt(req.params.id, 10);

  if (followerId === followeeId) {
    return res.status(400).json({ message: 'You cannot follow yourself.' });
  }

  try {
    await pgPool.query(
      `INSERT INTO followers (follower_id, followee_id)
       VALUES ($1, $2)
       ON CONFLICT DO NOTHING`,
      [followerId, followeeId]
    );
    res.status(200).json({ message: 'Successfully followed user.' });
  } catch (err) {
    console.error('Error following user:', err);
    res.status(500).json({ message: 'Failed to follow user.' });
  }
};

// POST /users/:id/unfollow
export const unfollowUser = async (req, res) => {
  const followerId = req.user.userId;
  const followeeId = parseInt(req.params.id, 10);

  try {
    await pgPool.query(
      `DELETE FROM followers
       WHERE follower_id = $1 AND followee_id = $2`,
      [followerId, followeeId]
    );
    res.status(200).json({ message: 'Successfully unfollowed user.' });
  } catch (err) {
    console.error('Error unfollowing user:', err);
    res.status(500).json({ message: 'Failed to unfollow user.' });
  }
};

// GET /users/:id/followers
export const getFollowers = async (req, res) => {
  const followeeId = parseInt(req.params.id, 10);

  try {
    const result = await pgPool.query(
      `SELECT u.id, u.username, u.email, f.followed_at
       FROM followers f
       JOIN users u ON f.follower_id = u.id
       WHERE f.followee_id = $1`,
      [followeeId]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching followers:', err);
    res.status(500).json({ message: 'Failed to fetch followers.' });
  }
};

// GET /users/:id/following
export const getFollowing = async (req, res) => {
  const followerId = parseInt(req.params.id, 10);

  try {
    const result = await pgPool.query(
      `SELECT u.id, u.username, u.email, f.followed_at
       FROM followers f
       JOIN users u ON f.followee_id = u.id
       WHERE f.follower_id = $1`,
      [followerId]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching following:', err);
    res.status(500).json({ message: 'Failed to fetch following.' });
  }
};


// GET /users/:id/social-overview
export const getSocialOverview = async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  try {
    // Get followers
    const followersResult = await pgPool.query(
      `SELECT u.id, u.username, u.email, f.followed_at
       FROM followers f
       JOIN users u ON f.follower_id = u.id
       WHERE f.followee_id = $1`,
      [userId]
    );

    // Get following
    const followingResult = await pgPool.query(
      `SELECT u.id, u.username, u.email, f.followed_at
       FROM followers f
       JOIN users u ON f.followee_id = u.id
       WHERE f.follower_id = $1`,
      [userId]
    );

    const followers = followersResult.rows;
    const following = followingResult.rows;

    res.status(200).json({
      followersCount: followers.length,
      followingCount: following.length,
      followers,
      following
    });
  } catch (err) {
    console.error('Error fetching social overview:', err);
    res.status(500).json({ message: 'Failed to fetch social overview.' });
  }
};
