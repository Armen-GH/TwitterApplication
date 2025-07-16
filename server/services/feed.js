import { Tweet } from '../models/Tweet.js';
import { getFollowingIds } from './follow.js';

export async function getFeed(userId, limit = 20) {
    const following = await getFollowingIds(userId);
    const authors = [...following, userId]; // include your own tweets too

    return Tweet.find({ author: { $in: authors } })
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate('author', 'username')
        .exec();
}