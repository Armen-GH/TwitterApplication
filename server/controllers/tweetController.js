import { Tweet } from '../models/Tweet.js';

export const createTweet = async (req, res) => {
  try {
    const userId = req.user.userId; // Comes from authMiddleware
    const { text, media, hashtags, mentions, inReplyTo, retweetOf } = req.body;

    if (!text && (!media || media.length === 0)) {
      return res.status(400).json({ message: 'Tweet must contain text or media.' });
    }

    const tweet = new Tweet({
      author: userId,
      text,
      media,
      hashtags,
      mentions,
      inReplyTo,
      retweetOf
    });

    const savedTweet = await tweet.save();
    res.status(201).json({ message: 'Tweet posted successfully.', tweet: savedTweet });

  } catch (error) {
    console.error('Tweet creation error:', error);
    res.status(500).json({ message: 'Failed to post tweet.' });
  }
};

//GET ALL TWEET
export const getTweets = async (req, res) => {
  try {
    const tweets = await Tweet.find()
      .sort({ createdAt: -1 }) // Newest first
      .limit(50); // Limit for performance

    res.status(200).json(tweets);
  } catch (error) {
    console.error('Error fetching tweets:', error);
    res.status(500).json({ message: 'Failed to fetch tweets.' });
  }
};

//RETWEET
export const retweet = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { originalTweetId } = req.body;

    if (!originalTweetId) {
      return res.status(400).json({ message: 'Original tweet ID is required for retweeting.' });
    }

    // Check if the original tweet exists
    const originalTweet = await Tweet.findById(originalTweetId);
    if (!originalTweet) {
      return res.status(404).json({ message: 'Original tweet not found.' });
    }

    // Create a new tweet referencing the original
    const retweet = new Tweet({
      author: userId,
      retweetOf: originalTweetId,
    });

    const savedRetweet = await retweet.save();
    res.status(201).json({ message: 'Retweet successful.', tweet: savedRetweet });

  } catch (error) {
    console.error('Retweet error:', error);
    res.status(500).json({ message: 'Failed to retweet.' });
  }
};

//REPLY TO TWEET
export const replyToTweet = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { text, media, hashtags, mentions, inReplyTo } = req.body;

    if (!inReplyTo) {
      return res.status(400).json({ message: 'Reply must reference a tweet (inReplyTo).' });
    }

    if (!text && (!media || media.length === 0)) {
      return res.status(400).json({ message: 'Reply must contain text or media.' });
    }

    const reply = new Tweet({
      author: userId,
      text,
      media,
      hashtags,
      mentions,
      inReplyTo
    });

    const savedReply = await reply.save();
    res.status(201).json({ message: 'Reply posted successfully.', tweet: savedReply });

  } catch (error) {
    console.error('Reply creation error:', error);
    res.status(500).json({ message: 'Failed to post reply.' });
  }
};