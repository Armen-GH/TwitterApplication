
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  MessageCircle,
  Repeat2,
  Share,
  MoreHorizontal,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatTimestamp } from '../data/mockData';

const Tweet = ({ tweet }) => {
  const {
    getUserById,
    likeTweet,
    retweetTweet,
    user: currentUser,
  } = useApp();
  const [liked, setLiked] = useState(false);
  const [retweeted, setRetweeted] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(tweet.comments || []);
  const [hasVoted, setHasVoted] = useState(false);
  const [votes, setVotes] = useState(tweet.poll ? Array(tweet.poll.length).fill(0) : []);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  const author = getUserById(tweet.userId);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
    if (!liked) likeTweet(tweet.id);
  };

  const handleRetweet = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setRetweeted(!retweeted);
    if (!retweeted) retweetTweet(tweet.id);
  };

  const handleReply = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowCommentBox((prev) => !prev);
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const submitComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const newComment = {
      id: Date.now(),
      userId: currentUser.id,
      content: commentText.trim(),
      timestamp: new Date().toISOString(),
    };
    setComments((prev) => [...prev, newComment]);
    setCommentText('');
    setShowCommentBox(false);
  };


  const handleVote = (index) => {
    if (hasVoted) return;
    const updated = [...votes];
    updated[index] += 1;
    setVotes(updated);
    setHasVoted(true);
  };

  return (
    <div className="border-b border-gray-800 p-4 hover:bg-gray-950 transition-colors cursor-pointer">
      <div className="flex space-x-3">
        <Link to={`/profile/${author.username}`} className="flex-shrink-0">
          <img src={author.avatar} alt={author.displayName} className="w-12 h-12 rounded-full hover:opacity-90 transition-opacity" />
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <Link to={`/profile/${author.username}`} className="font-bold hover:underline">
              {author.displayName}
            </Link>
            {author.verified && (
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
            <span className="text-gray-500">@{author.username}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500 text-sm">{formatTimestamp(tweet.timestamp)}</span>
            <div className="ml-auto relative" ref={dropdownRef}>
              <button
                className="text-gray-500 hover:text-white p-2 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDropdown((prev) => !prev);
                }}
              >
                <MoreHorizontal size={16} />
              </button>

              {showDropdown && (
                <div className="absolute right-0 z-50 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-lg">
                  <ul className="text-sm text-white py-1">
                    <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">Not interested in this post</li>
                    <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">Unfollow @{author.username}</li>
                    <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">Add/remove from Lists</li>
                    <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">Mute</li>
                    <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">Block @{author.username}</li>
                    
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="mb-3">
            <p className="text-white whitespace-pre-wrap">{tweet.content}</p>

            {tweet.poll && tweet.poll.length > 0 && (
              <div className="mt-3 space-y-2">
                {tweet.poll.map((option, index) => {
                  const total = votes.reduce((a, b) => a + b, 0);
                  const percentage = total ? Math.round((votes[index] / total) * 100) : 0;
                  return (
                    <button
                      key={index}
                      onClick={() => handleVote(index)}
                      disabled={hasVoted}
                      className={`w-full px-4 py-2 rounded text-left transition-all ${
                        hasVoted ? 'bg-blue-800 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
                      }`}
                    >
                      {option}
                      {hasVoted && (
                        <div className="w-full h-1 mt-1 bg-gray-600 rounded">
                          <div className="h-1 bg-blue-400 rounded" style={{ width: `${percentage}%` }}></div>
                          <span className="ml-2 text-sm text-gray-300">{percentage}%</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {tweet.image && (
              <div className="mt-3 rounded-2xl overflow-hidden border border-gray-700">
                <img src={tweet.image} alt="Tweet" className="w-full h-auto" />
              </div>
            )}
            {tweet.video && (
              <div className="mt-3 rounded-2xl overflow-hidden border border-gray-700">
                <video src={tweet.video} controls className="w-full h-auto" />
              </div>
            )}
          </div>

          <div className="flex justify-between max-w-md">
            <button onClick={handleReply} className="flex items-center space-x-2 text-gray-500 hover:text-blue-400 hover:bg-blue-400/10 p-2 rounded-full transition-colors">
              <MessageCircle size={18} />
              <span className="text-sm">{comments.length}</span>
            </button>
            <button onClick={handleRetweet} className={`flex items-center space-x-2 hover:bg-green-400/10 p-2 rounded-full transition-colors ${retweeted ? 'text-green-400' : 'text-gray-500 hover:text-green-400'}`}>
              <Repeat2 size={18} />
              <span className="text-sm">{tweet.retweets + (retweeted ? 1 : 0)}</span>
            </button>
            <button onClick={handleLike} className={`flex items-center space-x-2 hover:bg-red-400/10 p-2 rounded-full transition-colors ${liked ? 'text-red-500' : 'text-gray-500 hover:text-red-400'}`}>
              <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
              <span className="text-sm">{tweet.likes + (liked ? 1 : 0)}</span>
            </button>
            <button onClick={handleShare} className="flex items-center space-x-2 text-gray-500 hover:text-blue-400 hover:bg-blue-400/10 p-2 rounded-full transition-colors">
              <Share size={18} />
            </button>
          </div>

          {showCommentBox && (
            <form onSubmit={submitComment} className="mt-3 space-y-2">
              <textarea
                rows="2"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="w-full bg-gray-800 p-3 rounded-lg text-sm border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="text-right">
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 px-4 py-1 text-sm rounded font-semibold">Reply</button>
              </div>
            </form>
          )}

          {comments.length > 0 && (
            <div className="mt-4 space-y-3 text-sm">
              {comments.map((comment) => {
                const user = getUserById(comment.userId) || {
                  username: 'unknown',
                  displayName: 'Unknown User',
                  avatar: '/default-avatar.png',
                  verified: false,
                };
                return (
                  <div key={comment.id} className="flex space-x-3">
                    <Link to={`/profile/${user.username}`}>
                      <img src={user.avatar} alt={user.displayName} className="w-8 h-8 rounded-full" />
                    </Link>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{user.displayName}</span>
                        <span className="text-gray-500">@{user.username}</span>
                        <span className="text-gray-500 text-xs">{formatTimestamp(comment.timestamp)}</span>
                      </div>
                      <p className="text-gray-300">{comment.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tweet;
