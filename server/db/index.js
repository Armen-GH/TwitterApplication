import { Pool } from 'pg';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// ESModule way to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Point to .env manually
dotenv.config({
    path: path.resolve(__dirname, '../.env')
});

export const pgPool = new Pool({ connectionString: process.env.POSTGRES_URL });
export const mongo = mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});