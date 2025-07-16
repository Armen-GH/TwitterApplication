import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/protected-route', authMiddleware, (req, res) => {
  res.json({ message: 'You are authorized!', user: req.user });
});

export default router;
