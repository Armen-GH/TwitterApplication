import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  currentUser, 
  followingData, 
  mockUsers, 
  mockTweets,
  getUserById,
  getFollowing,
  isFollowing
} from '../data/mockData';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(currentUser);
  const [following, setFollowing] = useState(followingData);
  const [users, setUsers] = useState(mockUsers);
  const [tweets, setTweets] = useState(mockTweets);

  const followUser = (targetUserId) => {
    setFollowing(prev => ({
      ...prev,
      [user.id]: [...(prev[user.id] || []), targetUserId]
    }));
    
    // Update follower count for target user
    setUsers(prev => prev.map(u => 
      u.id === targetUserId 
        ? { ...u, followers: u.followers + 1 }
        : u
    ));
    
    // Update following count for current user
    setUsers(prev => prev.map(u => 
      u.id === user.id 
        ? { ...u, following: u.following + 1 }
        : u
    ));
  };

  const unfollowUser = (targetUserId) => {
    setFollowing(prev => ({
      ...prev,
      [user.id]: (prev[user.id] || []).filter(id => id !== targetUserId)
    }));
    
    // Update follower count for target user
    setUsers(prev => prev.map(u => 
      u.id === targetUserId 
        ? { ...u, followers: u.followers - 1 }
        : u
    ));
    
    // Update following count for current user
    setUsers(prev => prev.map(u => 
      u.id === user.id 
        ? { ...u, following: u.following - 1 }
        : u
    ));
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    setUsers(prev => prev.map(u => 
      u.id === user.id ? updatedUser : u
    ));
  };

  const isUserFollowing = (targetUserId) => {
    return isFollowing(user.id, targetUserId);
  };

  const getUserFollowing = (userId) => {
    return getFollowing(userId);
  };

  const likeTweet = (tweetId) => {
    setTweets(prev => prev.map(tweet => 
      tweet.id === tweetId 
        ? { ...tweet, likes: tweet.likes + 1 }
        : tweet
    ));
  };

  const retweetTweet = (tweetId) => {
    setTweets(prev => prev.map(tweet => 
      tweet.id === tweetId 
        ? { ...tweet, retweets: tweet.retweets + 1 }
        : tweet
    ));
  };

  const postTweet = (tweetData) => {
    const newTweet = {
      id: Date.now(),
      userId: currentUser.id,
      timestamp: new Date().toISOString(),
      content: tweetData.content,
      likes: 0,
      retweets: 0,
      comments: [],
      image: tweetData.media?.type?.startsWith('image') ? tweetData.mediaPreview : null,
      video: tweetData.media?.type?.startsWith('video') ? tweetData.mediaPreview : null,
      location: tweetData.location || null,
      scheduleTime: tweetData.scheduleTime || null,
      poll: tweetData.poll || null, 
    };

    setTweets((prev) => [newTweet, ...prev]);
  };


  const value = {
    user,
    users,
    tweets,
    following,
    followUser,
    unfollowUser,
    updateProfile,
    isUserFollowing,
    getUserFollowing,
    likeTweet,
    retweetTweet,
    postTweet,
    getUserById: (id) => users.find(u => u.id === id)
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
