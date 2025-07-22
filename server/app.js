import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import cors from 'cors';


import auth from './routes/auth.js';
import protectedRoutes from './routes/protectedRoutes.js'; 
import tweetRoutes from './routes/tweetRoutes.js';
import userRoutes from './routes/userRoutes.js';
import socialRoutes from './routes/socialRoutes.js';
import feedRoutes from './routes/feedRoutes.js';

dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Connect to PostgreSQL
const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pgPool.connect()
    .then(() => console.log('PostgreSQL connected'))
    .catch(err => console.error('PostgreSQL connection error:', err));

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173', // allow your frontend origin
  credentials: true                // allow cookies if needed
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/auth', auth);
app.use('/api/v1', protectedRoutes); 
app.use('/api', tweetRoutes);
app.use('/api', userRoutes);
app.use('/api', socialRoutes);
app.use('/api', feedRoutes);

app.get('/', (req, res) => {
  res.send('🚀 API is running!');
});

app.get('/api/test', (req, res) => {
  res.json({ message: '🎉 Connection to backend is working!' });
});


export default app;
export { pgPool };