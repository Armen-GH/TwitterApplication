import React from 'react';
import { useApp } from '../context/AppContext';

const FollowButton = ({ userId, className = "" }) => {
  const { followUser, unfollowUser, isUserFollowing, user: currentUser } = useApp();
  
  if (userId === currentUser.id) {
    return null; // don't show follow button for own profile
  }
  
  const isFollowing = isUserFollowing(userId);
  
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFollowing) {
      unfollowUser(userId);
    } else {
      followUser(userId);
    }
  };
  
  return (
    <button
      onClick={handleClick}
      className={`px-4 py-1 rounded-full font-bold text-sm transition-colors ${
        isFollowing
          ? 'border border-gray-600 text-white hover:border-red-500 hover:text-red-500'
          : 'bg-white text-black hover:bg-gray-200'
      } ${className}`}
    >
      {isFollowing ? 'Following' : 'Follow'}
    </button>
  );
};

export default FollowButton;
