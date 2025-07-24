// client/src/services/api.js
//function to handle signing up a user
export const signupUser = async ({ username, email, password }) => {
  const res = await fetch('/api/v1/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Signup failed');
  }

  return data;
};

// Function to handle user login
export const loginUser = async ({ email, password }) => {
  const response = await fetch('http://localhost:3000/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  let data;
  try {
    data = await response.json();
  } catch (err) {
    throw new Error('Invalid JSON response');
  }

  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return data; // contains token + user info
};


//user management functions


//Profile
export const getUserTweets = async (userId, token) => {
  const res = await fetch(`http://localhost:3000/api/users/${userId}/tweets`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch tweets");
  return res.json();
};

//Account Management
export const updatePassword = async (userId, token, newPassword) => {
  const res = await fetch(`http://localhost:3000/api/users/${userId}/password`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ newPassword }),
  });
  if (!res.ok) throw new Error("Failed to update password");
  return res.json();
};

