import { configureStore } from '@reduxjs/toolkit';
import tweetReducer from './tweetSlice';

const store = configureStore({
  reducer: {
    tweets: tweetReducer,
  },
});

export default store;
