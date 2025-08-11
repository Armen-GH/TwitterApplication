import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import TweetComposer from '../components/TweetComposer';
import Tweet from '../components/Tweet';
import { useApp } from '../context/AppContext';
import { getTweets, postTweet } from '../services/api';  // your API service functions

const Home = () => {
    const { user } = useApp();
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch tweets from API on mount
    useEffect(() => {
        const fetchTweets = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getTweets();
                setTweets(data.tweets);  // Assuming API returns { tweets: [...] }
            } catch (err) {
                console.error('Failed to fetch tweets:', err);
                setError('Failed to load tweets.');
            } finally {
                setLoading(false);
            }
        };

        fetchTweets();
    }, []);

    // Handler to add a new tweet after posting
    const handlePostTweet = async (content) => {
        setError(null);
        try {
            const newTweet = await postTweet({ content, userId: user.id });
            setTweets((prev) => [newTweet, ...prev]); // prepend new tweet
        } catch (err) {
            console.error('Failed to post tweet:', err);
            setError('Failed to post tweet.');
        }
    };

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="sticky top-0 bg-black/80 backdrop-blur-md border-b border-gray-800 p-4 flex items-center justify-between">
                <h1 className="text-xl font-bold">Home</h1>
                <button className="p-2 hover:bg-gray-900 rounded-full transition-colors">
                    <Sparkles size={20} />
                </button>
            </div>

            {/* Show error if any */}
            {error && (
                <div className="bg-red-600 text-white p-3 text-center">
                    {error}
                </div>
            )}

            {/* Tweet Composer */}
            <TweetComposer onPost={handlePostTweet} />

            {/* Tweets list */}
            <div>
                {loading ? (
                    <p className="text-gray-500 p-4 text-center">Loading tweets...</p>
                ) : tweets.length > 0 ? (
                    tweets.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)
                ) : (
                    <p className="text-gray-500 p-4 text-center">No tweets yet.</p>
                )}
            </div>
        </div>
    );
};

export default Home;

