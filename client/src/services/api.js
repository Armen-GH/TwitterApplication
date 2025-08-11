// client/src/services/api.js

export const signupUser = async ({ username, email, password }) => {
  const res = await fetch('/api/v1/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Signup failed');
  return data;
};

export const loginUser = async ({ email, password }) => {
  const res = await fetch('http://localhost:3000/api/v1/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  return data;
};

export const getUserTweets = async (userId, token) => {
  const res = await fetch(`http://localhost:3000/api/users/${userId}/tweets`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch tweets');
  return res.json();
};

export const updatePassword = async (userId, token, newPassword) => {
  const res = await fetch(`http://localhost:3000/api/users/${userId}/password`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ newPassword }),
  });
  if (!res.ok) throw new Error('Failed to update password');
  return res.json();
};

export const updateProfileAPI = async (userId, token, profileData) => {
  const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profileData),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to update profile');
  }
  return res.json();
};

export const followUser = async (userIdToFollow, token) => {
  const res = await fetch(`http://localhost:3000/api/users/${userIdToFollow}/follow`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to follow user');
  return res.json();
};

export const unfollowUser = async (userIdToUnfollow, token) => {
  const res = await fetch(`http://localhost:3000/api/users/${userIdToUnfollow}/unfollow`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to unfollow user');
  return res.json();
};

export const getFeedTweets = async (token) => {
  const res = await fetch(`http://localhost:3000/api/tweets/feed`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch feed');
  return res.json();
};

export const searchUsers = async (query, token) => {
  const res = await fetch(`http://localhost:3000/api/users/search?q=${encodeURIComponent(query)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to search users');
  return res.json();
};
