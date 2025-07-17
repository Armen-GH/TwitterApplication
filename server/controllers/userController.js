import { pgPool } from '../db/index.js';
import bcrypt from 'bcrypt';

// GET /users/:id – get profile info
export const getUserProfile = async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const result = await pgPool.query(
      `SELECT id, username, email FROM users WHERE id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// PUT /users/:id – update profile info
export const updateUserProfile = async (req, res) => {
  const userId = parseInt(req.params.id);
  const { username, email } = req.body;

  try {
    const result = await pgPool.query(
      `UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING id, username, email`,
      [username, email, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ message: 'Profile updated successfully', user: result.rows[0] });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// PUT /users/:id/password – change password
export const changeUserPassword = async (req, res) => {
  const userId = parseInt(req.params.id);
  const { newPassword } = req.body;

  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await pgPool.query(
      `UPDATE users SET password_hash = $1 WHERE id = $2`,
      [hashedPassword, userId]
    );

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};
