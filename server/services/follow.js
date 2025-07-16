import { pgPool } from '../db/postgres.js';

export async function follow(followerId, followeeId) {
    const sql = `
        INSERT INTO followers (follower_id, followee_id)
        VALUES ($1, $2) ON CONFLICT DO NOTHING
    `;
    await pgPool.query(sql, [followerId, followeeId]);
}

export async function getFollowers(userId) {
    const { rows } = await pgPool.query(
        `SELECT u.id, u.username
     FROM followers f
     JOIN users u ON u.id = f.follower_id
     WHERE f.followee_id = $1`,
        [userId]
    );
    return rows;
}

export async function getFollowingIds(userId) {
    const { rows } = await pgPool.query(
        `SELECT followee_id FROM followers WHERE follower_id = $1`,
        [userId]
    );
    return rows.map(r => r.followee_id);
}