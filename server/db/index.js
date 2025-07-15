import dotenv from 'dotenv';
dotenv.config(); // MUST be at the top!

import mongoose from 'mongoose';
import { Pool } from 'pg';

console.log("✅ MONGODB_URI:", process.env.MONGODB_URI); // Debug

export const pgPool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});

export const mongo = mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});