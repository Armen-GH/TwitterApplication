import { createSlice } from '@reduxjs/toolkit';

const tweetSlice = createSlice({
  name: 'tweets',
  initialState: {
    tweets: [],
  },
  reducers: {
    addTweet: (state, action) => {
      state.tweets.unshift(action.payload);
    },
    removeTweet: (state, action) => {
      state.tweets = state.tweets.filter(tweet => tweet.id !== action.payload);
    },
    setTweets: (state, action) => {
      state.tweets = action.payload;
    },
  },
});

export const { addTweet, removeTweet, setTweets } = tweetSlice.actions;
export const selectAllTweets = (state) => state.tweets.tweets;

export default tweetSlice.reducer;
