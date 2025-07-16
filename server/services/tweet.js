import { Tweet } from '../models/Tweet.js';

export async function postTweet(authorId, text, media = []) {
    const tweet = new Tweet({ author: authorId, text, media });
    return await tweet.save();
}

