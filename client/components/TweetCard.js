import React from 'react';

const TweetCard = ({ tweet }) => (
  <div style={{ border: '1px solid #eee', padding: '10px', marginBottom: '10px' }}>
    <h4>@{tweet.username}</h4>
    <p>{tweet.content}</p>
  </div>
);

export default TweetCard;
