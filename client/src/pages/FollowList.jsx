import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import {
  fetchFollowers,
  fetchFollowing,
  followUserApi,
  unfollowUserApi,
} from '../services/api';

const FollowList = () => {
  const { username, type } = useParams(); // type: 'followers' or 'following'
  const [profileUser, setProfileUser] = useState(null);
  const [followList, setFollowList] = useState([]);
  const [activeTab, setActiveTab] = useState(type || 'followers');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);

  // Dummy currentUser for demonstration - replace with actual auth context/user data
  const currentUser = JSON.parse(localStorage.getItem('user')) || {};

  // Fetch profile user info (you can replace this with real API call if needed)
  useEffect(() => {
    // Example: you might fetch the user profile here from backend or context
    // For now just set a dummy user matching the username param:
    setProfileUser({ username, displayName: username, id: username, followers: 0, following: 0 });
  }, [username]);

  // Load followers or following list when username or tab changes
  useEffect(() => {
    setError(null);
    setStatus(null);

    const loadList = async () => {
      try {
        if (activeTab === 'followers') {
          const followers = await fetchFollowers(username);
          setFollowList(followers);
        } else {
          const following = await fetchFollowing(username);
          setFollowList(following);
        }
      } catch (err) {
        setError('Failed to load user list.');
      }
    };

    loadList();
  }, [username, activeTab]);

  const handleFollowToggle = async (userToToggle) => {
    setError(null);
    setStatus(null);

    try {
      if (userToToggle.isFollowing) {
        await unfollowUserApi(userToToggle.username);
        setStatus(`Unfollowed @${userToToggle.username}`);
      } else {
        await followUserApi(userToToggle.username);
        setStatus(`Followed @${userToToggle.username}`);
      }
      // Refresh list after action
      if (activeTab === 'followers') {
        const followers = await fetchFollowers(username);
        setFollowList(followers);
      } else {
        const following = await fetchFollowing(username);
        setFollowList(following);
      }
    } catch {
      setError('Action failed. Please try again.');
    }
  };

  if (!profileUser) {
    return (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">User not found</p>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-black text-white">
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

        {/* Error & Status Messages */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {status && <p className="text-green-500 text-center mt-4">{status}</p>}

        {/* Follow List */}
        <div>
          {followList.length > 0 ? (
              <div className="divide-y divide-gray-800">
                {followList.map((user) => {
                  const isOwnProfile = currentUser?.id === user.id;
                  // You might get following status from your backend user object, here I assume it’s included:
                  const isFollowing = user.isFollowing || false;

                  return (
                      <div key={user.id} className="p-4 hover:bg-gray-950 transition-colors flex items-center justify-between">
                        <Link to={`/profile/${user.username}`} className="flex items-center space-x-3 flex-1">
                          <img
                              src={user.avatar || 'https://via.placeholder.com/48'}
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
                        <span>
                          <span className="text-white font-bold">{user.following || 0}</span> Following
                        </span>
                              <span>
                          <span className="text-white font-bold">{user.followers || 0}</span> Followers
                        </span>
                            </div>
                          </div>
                        </Link>

                        {!isOwnProfile && (
                            <button
                                onClick={() => handleFollowToggle({ username: user.username, isFollowing })}
                                className={`px-4 py-1 rounded-full font-bold text-sm transition-colors ${
                                    isFollowing
                                        ? 'border border-gray-600 text-white hover:border-red-500 hover:text-red-500'
                                        : 'bg-white text-black hover:bg-gray-200'
                                }`}
                            >
                              {isFollowing ? 'Following' : 'Follow'}
                            </button>
                        )}
                      </div>
                  );
                })}
              </div>
          ) : (
              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-2">
                  {activeTab === 'followers'
                      ? `@${profileUser.username} doesn't have any followers yet`
                      : `@${profileUser.username} isn't following anyone yet`}
                </h3>
                <p className="text-gray-500">
                  {activeTab === 'followers'
                      ? "When someone follows them, they'll show up here."
                      : "When they follow someone, they'll show up here."}
                </p>
              </div>
          )}
        </div>
      </div>
  );
};

export default FollowList;
