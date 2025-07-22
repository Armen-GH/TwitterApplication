import React, { useState } from 'react';
import {
  Image,
  Smile,
  Calendar,
  MapPin,
  BarChartHorizontal,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const TweetComposer = () => {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [location, setLocation] = useState('');
  const [showPoll, setShowPoll] = useState(false);
  const [pollOptions, setPollOptions] = useState(['', '']);

  const { user, postTweet } = useApp();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(file);
      setMediaPreview(URL.createObjectURL(file));
    }
  };

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation(`${pos.coords.latitude},${pos.coords.longitude}`);
      },
      () => alert('Location access denied.')
    );
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    postTweet({
      content,
      media,
      mediaPreview,
      location,
      scheduleTime,
      poll: showPoll ? pollOptions.filter((opt) => opt.trim()) : null,
    });

    setContent('');
    setMedia(null);
    setMediaPreview('');
    setLocation('');
    setScheduleTime('');
    setShowPoll(false);
    setPollOptions(['', '']);
  };

  const isDisabled = !content.trim() || content.length > 280;

  return (
    <div className="border-b border-gray-800 p-4">
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

            {/* Media Preview */}
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

            {scheduleTime && (
              <p className="text-sm text-blue-400 mt-1">
                Scheduled for: {new Date(scheduleTime).toLocaleString()}
              </p>
            )}

            {location && (
              <p className="text-sm text-green-400 mt-1">📍 {location}</p>
            )}

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-4">
                <label className="text-blue-400 hover:bg-blue-400/10 p-2 rounded-full transition-colors cursor-pointer">
                  <Image size={20} />
                  <input
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>

                <button
                  type="button"
                  className="text-blue-400 hover:bg-blue-400/10 p-2 rounded-full transition-colors"
                  title="Emojis coming soon"
                >
                  <Smile size={20} />
                </button>

                <label className="text-blue-400 hover:bg-blue-400/10 p-2 rounded-full transition-colors cursor-pointer">
                  <Calendar size={20} />
                  <input
                    type="datetime-local"
                    className="hidden"
                    onChange={(e) => setScheduleTime(e.target.value)}
                  />
                </label>

                <button
                  type="button"
                  onClick={handleLocation}
                  className="text-blue-400 hover:bg-blue-400/10 p-2 rounded-full transition-colors"
                >
                  <MapPin size={20} />
                </button>

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
