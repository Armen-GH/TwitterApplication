import bcrypt from 'bcrypt';
import { pgPool } from '../db/index.js';


export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // 1. Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Insert into DB
    const result = await pgPool.query(
      `INSERT INTO users (username, email, password_hash, created_at)
       VALUES ($1, $2, $3, NOW())
       RETURNING id, username, email, created_at`,
      [username, email, hashedPassword]
    );

    // 4. Respond with new user data (not password!)
    res.status(201).json({ user: result.rows[0] });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error signing up user.' });
  }
};
