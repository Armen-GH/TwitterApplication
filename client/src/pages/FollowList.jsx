import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getFollowers } from '../data/mockData';

const FollowList = () => {
  const { username, type } = useParams(); // type is 'following' or 'followers'
  const { 
    users, 
    user: currentUser, 
    followUser, 
    unfollowUser, 
    isUserFollowing,
    getUserFollowing
  } = useApp();
  
  const [profileUser, setProfileUser] = useState(null);
  const [followList, setFollowList] = useState([]);
  const [activeTab, setActiveTab] = useState(type || 'followers');

  useEffect(() => {
    const user = users.find(u => u.username === username);
    setProfileUser(user);
    
    if (user) {
      updateFollowList(user.id, activeTab);
    }
  }, [username, users, activeTab]);

  const updateFollowList = (userId, listType) => {
    let userIds = [];
    
    if (listType === 'following') {
      userIds = getUserFollowing(userId);
    } else {
      userIds = getFollowers(userId);
    }
    
    const userList = userIds.map(id => users.find(u => u.id === id)).filter(Boolean);
    setFollowList(userList);
  };

  if (!profileUser) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">User not found</p>
      </div>
    );
  }

  const isOwnProfile = currentUser.id === profileUser.id;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-black/80 backdrop-blur-md border-b border-gray-800 p-4 flex items-center space-x-4">
        <Link to={`/profile/${profileUser.username}`} className="p-2 hover:bg-gray-900 rounded-full transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-xl font-bold">{profileUser.displayName}</h1>
          <p className="text-sm text-gray-500">@{profileUser.username}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-800">
        <div className="flex">
          <button
            onClick={() => setActiveTab('followers')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors relative ${
              activeTab === 'followers'
                ? 'text-white'
                : 'text-gray-500 hover:text-gray-300 hover:bg-gray-900'
            }`}
          >
            Followers
            {activeTab === 'followers' && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-500 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('following')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors relative ${
              activeTab === 'following'
                ? 'text-white'
                : 'text-gray-500 hover:text-gray-300 hover:bg-gray-900'
            }`}
          >
            Following
            {activeTab === 'following' && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-500 rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* Follow List */}
      <div>
        {followList.length > 0 ? (
          <div className="divide-y divide-gray-800">
            {followList.map((user) => (
              <div key={user.id} className="p-4 hover:bg-gray-950 transition-colors">
                <div className="flex items-center justify-between">
                  <Link to={`/profile/${user.username}`} className="flex items-center space-x-3 flex-1">
                    <img
                      src={user.avatar}
                      alt={user.displayName}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1">
                        <h3 className="font-bold hover:underline">{user.displayName}</h3>
                        {user.verified && (
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-500">@{user.username}</p>
                      <p className="text-sm text-gray-300 mt-1 line-clamp-2">{user.bio}</p>
                      <div className="flex space-x-4 mt-2 text-sm text-gray-500">
                        <span><span className="text-white font-bold">{user.following}</span> Following</span>
                        <span><span className="text-white font-bold">{user.followers}</span> Followers</span>
                      </div>
                    </div>
                  </Link>
                  {user.id !== currentUser.id && (
                    <button
                      onClick={() => isUserFollowing(user.id) ? unfollowUser(user.id) : followUser(user.id)}
                      className={`px-4 py-1 rounded-full font-bold text-sm transition-colors ${
                        isUserFollowing(user.id)
                          ? 'border border-gray-600 text-white hover:border-red-500 hover:text-red-500'
                          : 'bg-white text-black hover:bg-gray-200'
                      }`}
                    >
                      {isUserFollowing(user.id) ? 'Following' : 'Follow'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">
              {activeTab === 'followers' 
                ? `@${profileUser.username} doesn't have any followers yet`
                : `@${profileUser.username} isn't following anyone yet`
              }
            </h3>
            <p className="text-gray-500">
              {activeTab === 'followers' 
                ? "When someone follows them, they'll show up here."
                : "When they follow someone, they'll show up here."
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowList;
