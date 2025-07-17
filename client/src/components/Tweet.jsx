import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatTimestamp } from '../data/mockData';

const Tweet = ({ tweet }) => {
  const { getUserById, likeTweet, retweetTweet } = useApp();
  const [liked, setLiked] = useState(false);
  const [retweeted, setRetweeted] = useState(false);
  
  const author = getUserById(tweet.userId);

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
    if (!liked) {
      likeTweet(tweet.id);
    }
  };

  const handleRetweet = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setRetweeted(!retweeted);
    if (!retweeted) {
      retweetTweet(tweet.id);
    }
  };

  const handleReply = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Handle reply
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Handle share
  };

  return (
    <div className="border-b border-gray-800 p-4 hover:bg-gray-950 transition-colors cursor-pointer">
      <div className="flex space-x-3">
        {/* Avatar */}
        <Link to={`/profile/${author.username}`} className="flex-shrink-0">
          <img
            src={author.avatar}
            alt={author.displayName}
            className="w-12 h-12 rounded-full hover:opacity-90 transition-opacity"
          />
        </Link>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center space-x-2 mb-1">
            <Link 
              to={`/profile/${author.username}`}
              className="font-bold hover:underline"
            >
              {author.displayName}
            </Link>
            {author.verified && (
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
            <span className="text-gray-500">@{author.username}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500 text-sm">
              {formatTimestamp(tweet.timestamp)}
            </span>
            <div className="ml-auto">
              <button className="text-gray-500 hover:text-gray-300 hover:bg-gray-800 p-2 rounded-full transition-colors">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>

          {/* Tweet Content */}
          <div className="mb-3">
            <p className="text-white whitespace-pre-wrap">{tweet.content}</p>
            {tweet.image && (
              <div className="mt-3 rounded-2xl overflow-hidden border border-gray-700">
                <img
                  src={tweet.image}
                  alt="Tweet image"
                  className="w-full h-auto"
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between max-w-md">
            <button
              onClick={handleReply}
              className="flex items-center space-x-2 text-gray-500 hover:text-blue-400 hover:bg-blue-400/10 p-2 rounded-full transition-colors group"
            >
              <MessageCircle size={18} />
              <span className="text-sm">{tweet.replies}</span>
            </button>

            <button
              onClick={handleRetweet}
              className={`flex items-center space-x-2 hover:bg-green-400/10 p-2 rounded-full transition-colors group ${
                retweeted ? 'text-green-400' : 'text-gray-500 hover:text-green-400'
              }`}
            >
              <Repeat2 size={18} />
              <span className="text-sm">
                {tweet.retweets + (retweeted ? 1 : 0)}
              </span>
            </button>

            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 hover:bg-red-400/10 p-2 rounded-full transition-colors group ${
                liked ? 'text-red-500' : 'text-gray-500 hover:text-red-400'
              }`}
            >
              <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
              <span className="text-sm">
                {tweet.likes + (liked ? 1 : 0)}
              </span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center space-x-2 text-gray-500 hover:text-blue-400 hover:bg-blue-400/10 p-2 rounded-full transition-colors group"
            >
              <Share size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
