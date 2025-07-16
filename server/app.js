import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Pool } from 'pg';

import auth from './routes/auth.js';
import protectedRoutes from './routes/protectedRoutes.js'; 

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/auth', auth);
app.use('/api/v1', protectedRoutes); 

app.get('/', (req, res) => {
  res.send('🚀 API is running!');
});

export default app;
export { pgPool };