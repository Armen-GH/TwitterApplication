import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const pgPool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function seedPostgres() {
    try {
        await pgPool.query(`
      INSERT INTO users (username, email, password_hash, name)
      VALUES
        ('alice', 'alice@example.com', 'hashed_password1', 'Alice'),
        ('bob', 'bob@example.com', 'hashed_password2', 'Bob'),
        ('charlie', 'charlie@example.com', 'hashed_password3', 'Charlie')
      ON CONFLICT DO NOTHING;
    `);

        await pgPool.query(`
      INSERT INTO followers (follower_id, followee_id)
      VALUES 
        (1, 2), 
        (2, 3),
        (3, 1)
      ON CONFLICT DO NOTHING;
    `);

        console.log('✅ PostgreSQL seeding complete');
    } catch (err) {
        console.error('❌ PostgreSQL seeding error:', err);
    } finally {
        await pgPool.end();
    }
}

seedPostgres();