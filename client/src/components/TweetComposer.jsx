import React, { useState } from 'react';
import { Image, Smile, Calendar, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';

const TweetComposer = () => {
  const [content, setContent] = useState('');
  const { user, postTweet } = useApp();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      postTweet(content);
      setContent('');
    }
  };

  const isDisabled = !content.trim() || content.length > 280;

  return (
    <div className="border-b border-gray-800 p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-3">
          {/* Avatar */}
          <img
            src={user.avatar}
            alt={user.displayName}
            className="w-12 h-12 rounded-full flex-shrink-0"
          />

          {/* Input Area */}
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's happening?"
              className="w-full bg-transparent text-xl placeholder-gray-500 border-none outline-none resize-none text-white"
              rows="3"
            />

            {/* Options and Tweet Button */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  className="text-blue-400 hover:bg-blue-400/10 p-2 rounded-full transition-colors"
                >
                  <Image size={20} />
                </button>
                <button
                  type="button"
                  className="text-blue-400 hover:bg-blue-400/10 p-2 rounded-full transition-colors"
                >
                  <Smile size={20} />
                </button>
                <button
                  type="button"
                  className="text-blue-400 hover:bg-blue-400/10 p-2 rounded-full transition-colors"
                >
                  <Calendar size={20} />
                </button>
                <button
                  type="button"
                  className="text-blue-400 hover:bg-blue-400/10 p-2 rounded-full transition-colors"
                >
                  <MapPin size={20} />
                </button>
              </div>

              <div className="flex items-center space-x-3">
                {content && (
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-8 h-8 rounded-full border-2 relative ${
                        content.length > 280
                          ? 'border-red-500'
                          : content.length > 260
                          ? 'border-yellow-500'
                          : 'border-gray-600'
                      }`}
                    >
                      <div
                        className={`absolute inset-0 rounded-full ${
                          content.length > 280
                            ? 'bg-red-500'
                            : content.length > 260
                            ? 'bg-yellow-500'
                            : 'bg-blue-500'
                        }`}
                        style={{
                          transform: `rotate(${(content.length / 280) * 360}deg)`,
                          clipPath: 'polygon(50% 0%, 100% 0%, 100% 50%, 50% 50%)'
                        }}
                      />
                    </div>
                    {content.length > 260 && (
                      <span
                        className={`text-sm ${
                          content.length > 280 ? 'text-red-500' : 'text-yellow-500'
                        }`}
                      >
                        {280 - content.length}
                      </span>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isDisabled}
                  className={`px-6 py-2 rounded-full font-bold transition-colors ${
                    isDisabled
                      ? 'bg-blue-900 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  Tweet
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TweetComposer;
