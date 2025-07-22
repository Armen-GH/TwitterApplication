import React, { useState } from 'react';
import {
  Image,
  Smile,
  BarChartHorizontal,
} from 'lucide-react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

import { useApp } from '../context/AppContext';

const TweetComposer = () => {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState('');
  const [showPoll, setShowPoll] = useState(false);
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { user, postTweet } = useApp();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(file);
      setMediaPreview(URL.createObjectURL(file));
    }
  };

  const handlePollChange = (index, value) => {
    const updated = [...pollOptions];
    updated[index] = value;
    setPollOptions(updated);
  };

  const handleAddPollOption = () => {
    if (pollOptions.length < 4) {
      setPollOptions([...pollOptions, '']);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setContent((prev) => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    postTweet({
      content,
      media,
      mediaPreview,
      poll: pollOptions.filter((opt) => opt.trim() !== ''),
    });

    setContent('');
    setMedia(null);
    setMediaPreview('');
    setShowPoll(false);
    setPollOptions(['', '']);
  };

  const isDisabled = !content.trim() || content.length > 280;

  return (
    <div className="border-b border-gray-800 p-4 relative">
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-3">
          <img
            src={user.avatar}
            alt={user.displayName}
            className="w-12 h-12 rounded-full flex-shrink-0"
          />

          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's happening?"
              className="w-full bg-transparent text-xl placeholder-gray-500 border-none outline-none resize-none text-white"
              rows="3"
            />

            {/* Poll Input */}
            {showPoll && (
              <div className="mt-3 space-y-2">
                {pollOptions.map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    value={option}
                    onChange={(e) => handlePollChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="w-full bg-gray-800 text-white p-2 rounded border border-gray-700 text-sm"
                  />
                ))}
                {pollOptions.length < 4 && (
                  <button
                    type="button"
                    onClick={handleAddPollOption}
                    className="text-blue-400 hover:underline text-sm"
                  >
                    + Add option
                  </button>
                )}
              </div>
            )}

            {/* media Preview */}
            {mediaPreview && (
              <div className="mt-2">
                {media?.type?.startsWith('image') ? (
                  <img
                    src={mediaPreview}
                    alt="preview"
                    className="max-w-xs rounded-lg border border-gray-600"
                  />
                ) : (
                  <video
                    src={mediaPreview}
                    controls
                    className="max-w-xs rounded-lg border border-gray-600"
                  />
                )}
              </div>
            )}

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-4">
                {/* Upload Media */}
                <label className="text-blue-400 hover:bg-blue-400/10 p-2 rounded-full transition-colors cursor-pointer">
                  <Image size={20} />
                  <input
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>

                {/* emoji Picker */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker((prev) => !prev)}
                    className="text-blue-400 hover:bg-blue-400/10 p-2 rounded-full transition-colors"
                    title="Add emoji"
                  >
                    <Smile size={20} />
                  </button>
                  {showEmojiPicker && (
                    <div className="absolute z-50">
                      <Picker
                        data={data}
                        onEmojiSelect={handleEmojiSelect}
                        theme="dark"
                      />

                    </div>
                  )}
                </div>

                {/* Poll Button */}
                <button
                  type="button"
                  onClick={() => setShowPoll(!showPoll)}
                  className="text-blue-400 hover:bg-blue-400/10 p-2 rounded-full transition-colors"
                  title="Add Poll"
                >
                  <BarChartHorizontal size={20} />
                </button>
              </div>

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
      </form>
    </div>
  );
};

export default TweetComposer;
