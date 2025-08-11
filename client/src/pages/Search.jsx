import { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const { followUser, unfollowUser, isUserFollowing, user: currentUser } = useApp();
  const debounceTimeout = useRef(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setError(null);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setError(null);

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      fetch(`/api/search/users?q=${encodeURIComponent(query.trim())}`)
          .then((res) => {
            if (!res.ok) throw new Error('Failed to fetch search results');
            return res.json();
          })
          .then((data) => {
            setResults(data.users || []);
            setIsSearching(false);
          })
          .catch((err) => {
            setError(err.message || 'Something went wrong');
            setIsSearching(false);
          });
    }, 400);

    // Cleanup on unmount or query change
    return () => clearTimeout(debounceTimeout.current);
  }, [query]);

  const trending = [
    { tag: '#React', tweets: '25.4K' },
    { tag: '#TypeScript', tweets: '18.2K' },
    { tag: '#JavaScript', tweets: '45.7K' },
    { tag: '#OpenAI', tweets: '32.1K' },
    { tag: '#WebDevelopment', tweets: '15.8K' },
    { tag: '#AI', tweets: '67.3K' },
  ];

  return (
      <div className="min-h-screen">
        {/* Header with Search */}
        <div className="sticky top-0 bg-black/80 backdrop-blur-md border-b border-gray-800 p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-500" />
              </div>
              <input
                  type="text"
                  placeholder="Search Twitter"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-full py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Search Results */}
        {query && (
            <div>
              <div className="p-4 border-b border-gray-800">
                <h2 className="text-xl font-bold">People</h2>
              </div>

              {isSearching && (
                  <div className="p-4 text-center text-gray-400">Searching...</div>
              )}

              {error && (
                  <div className="p-4 text-center text-red-500">{error}</div>
              )}

              {!isSearching && !error && (
                  <>
                    {results.length > 0 ? (
                        <div className="divide-y divide-gray-800">
                          {results.map((user) => (
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
                          <p className="text-gray-500">No people found for "{query}"</p>
                        </div>
                    )}
                  </>
              )}
            </div>
        )}

        {/* Trending Section (when no search) */}
        {!query && (
            <div>
              <div className="p-4 border-b border-gray-800">
                <h2 className="text-xl font-bold">Trends for you</h2>
              </div>

              <div className="divide-y divide-gray-800">
                {trending.map((trend, index) => (
                    <div key={index} className="p-4 hover:bg-gray-950 transition-colors cursor-pointer">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="text-gray-500 text-sm">Trending in Technology</p>
                          <p className="font-bold text-lg">{trend.tag}</p>
                          <p className="text-gray-500 text-sm">{trend.tweets} Tweets</p>
                        </div>
                        <button className="text-gray-500 hover:text-gray-300 p-1">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                ))}
              </div>
            </div>
        )}
      </div>
  );
};

export default Search;
