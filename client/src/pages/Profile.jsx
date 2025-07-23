import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Link as LinkIcon, 
  Calendar,
  MoreHorizontal 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Tweet from '../components/Tweet';

const Profile = () => {
  const { username } = useParams();
  const { 
    users, 
    user: currentUser, 
    followUser, 
    unfollowUser, 
    isUserFollowing,
    getUserFollowing,
    tweets
  } = useApp();
  
  const [activeTab, setActiveTab] = useState('tweets');
  const [profileUser, setProfileUser] = useState(null);
  const [userTweets, setUserTweets] = useState([]);
  const [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    const user = users.find(u => u.username === username);
    setProfileUser(user);
    
    if (user) {
      const userTweetsList = tweets.filter(t => t.userId === user.id);
      setUserTweets(userTweetsList);
      
      const following = getUserFollowing(user.id).map(id => 
        users.find(u => u.id === id)
      ).filter(Boolean);
      setFollowingList(following);
    }
  }, [username, users, tweets, getUserFollowing]);

  if (!profileUser) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">User not found</p>
      </div>
    );
  }

  const isOwnProfile = currentUser.id === profileUser.id;
  const isFollowing = isUserFollowing(profileUser.id);

  const handleFollowClick = () => {
    if (isFollowing) {
      unfollowUser(profileUser.id);
    } else {
      followUser(profileUser.id);
    }
  };

  const tabs = [
    { id: 'tweets', name: 'Tweets', count: userTweets.length },
    { id: 'replies', name: 'Tweets & replies', count: 0 },
    { id: 'media', name: 'Media', count: userTweets.filter(t => t.image).length },
    { id: 'likes', name: 'Likes', count: 0 },
  ];


  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-black/80 backdrop-blur-md border-b border-gray-800 p-4 flex items-center space-x-4">
        <Link to="/" className="p-2 hover:bg-gray-900 rounded-full transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-xl font-bold">{profileUser.displayName}</h1>
          <p className="text-sm text-gray-500">{userTweets.length} Tweets</p>
        </div>
      </div>

      {/* Profile Header */}
      <div>
        {/* Banner */}
        <div className="h-48 bg-gray-800 relative">
          {profileUser.banner && (
            <img
              src={profileUser.banner}
              alt="Profile banner"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Profile Info */}
        <div className="px-4 pb-4">
          <div className="flex justify-between items-start -mt-16 mb-4">
            <img
              src={profileUser.avatar}
              alt={profileUser.displayName}
              className="w-32 h-32 rounded-full border-4 border-black"
            />
            <div className="flex space-x-2 mt-16">
              <button className="p-2 border border-gray-600 rounded-full hover:bg-gray-900 transition-colors">
                <MoreHorizontal size={20} />
              </button>
              {isOwnProfile ? (
                <Link
                  to="/settings/profile"
                  className="px-6 py-2 border border-gray-600 rounded-full font-bold hover:bg-gray-900 transition-colors"
                >
                  Edit profile
                </Link>
              ) : (
                <button
                  onClick={handleFollowClick}
                  className={`px-6 py-2 rounded-full font-bold transition-colors ${
                    isFollowing
                      ? 'border border-gray-600 text-white hover:border-red-500 hover:text-red-500'
                      : 'bg-white text-black hover:bg-gray-200'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex items-center space-x-1">
                <h1 className="text-2xl font-bold">{profileUser.displayName}</h1>
                {profileUser.verified && (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                )}
              </div>
              <p className="text-gray-500">@{profileUser.username}</p>
            </div>

            <p className="text-white">{profileUser.bio}</p>

            <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm">
              {profileUser.location && (
                <div className="flex items-center space-x-1">
                  <MapPin size={16} />
                  <span>{profileUser.location}</span>
                </div>
              )}
              {profileUser.website && (
                <div className="flex items-center space-x-1">
                  <LinkIcon size={16} />
                  <a
                    href={profileUser.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {profileUser.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <Calendar size={16} />
                <span>Joined {profileUser.joinDate}</span>
              </div>
            </div>

            <div className="flex space-x-6 text-sm">
              <Link to={`/profile/${profileUser.username}/following`} className="hover:underline">
                <span className="font-bold text-white">{profileUser.following}</span>
                <span className="text-gray-500 ml-1">Following</span>
              </Link>
              <Link to={`/profile/${profileUser.username}/followers`} className="hover:underline">
                <span className="font-bold text-white">{profileUser.followers}</span>
                <span className="text-gray-500 ml-1">Followers</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-800">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors relative ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-gray-900'
              }`}
            >
              {tab.name}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'tweets' && (
          <div>
            {userTweets.length > 0 ? (
              userTweets.map((tweet) => (
                <Tweet key={tweet.id} tweet={tweet} />
              ))
            ) : (
              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-2">No Tweets yet</h3>
                <p className="text-gray-500">
                  {isOwnProfile 
                    ? "When you post Tweets, they'll show up here."
                    : `@${profileUser.username} hasn't Tweeted yet.`
                  }
                </p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'media' && (
          <div>
            {userTweets.filter(t => t.image).length > 0 ? (
              userTweets.filter(t => t.image).map((tweet) => (
                <Tweet key={tweet.id} tweet={tweet} />
              ))
            ) : (
              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-2">No media yet</h3>
                <p className="text-gray-500">
                  Tweets with photos and videos will show up here.
                </p>
              </div>
            )}
          </div>
        )}

        {(activeTab === 'replies' || activeTab === 'likes') && (
          <div className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Nothing to see here</h3>
            <p className="text-gray-500">
              This feature is coming soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;