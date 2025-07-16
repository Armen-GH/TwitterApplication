import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pgPool } from '../db/index.js';

const JWT_SECRET = process.env.JWT_SECRET || 'default_fallback_secret';

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


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // 2. Look up user by email
    const result = await pgPool.query(
      `SELECT id, username, email, password_hash FROM users WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const user = result.rows[0];

    // 3. Compare password with hash
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // 4. Create JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email }, 
      JWT_SECRET,
      { expiresIn: '2h' } // Optional: expires in 2 hours
    );

    // 5. Respond with token and basic user info
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Error logging in user.' });
  }
};