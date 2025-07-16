import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTweets, selectAllTweets } from '../redux/tweetSlice';
import { fetchTweets } from '../services/tweetService';
import Navbar from '../components/Navbar';
import TweetCard from '../components/TweetCard';

const HomePage = () => {
  const dispatch = useDispatch();
  const tweets = useSelector(selectAllTweets);

  useEffect(() => {
    const loadTweets = async () => {
      const data = await fetchTweets();
      dispatch(setTweets(data));
    };
    loadTweets();
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h2>Home</h2>
        {tweets.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </>
  );
};

export default HomePage;
