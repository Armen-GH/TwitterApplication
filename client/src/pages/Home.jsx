import React, { useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import TweetComposer from '../components/TweetComposer';
import Tweet from '../components/Tweet';
import { useApp } from '../context/AppContext';



const Home = () => {
  const { tweets } = useApp();


  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-black/80 backdrop-blur-md border-b border-gray-800 p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Home</h1>
        <button className="p-2 hover:bg-gray-900 rounded-full transition-colors">
          <Sparkles size={20} />
        </button>
      </div>

      {/* Tweet Composer */}
      <TweetComposer />

      {/* Tweet List */}
      <div>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
};

export default Home;
