// Mock data for the Twitter clone

export const mockUsers = [
  {
    id: 1,
    username: "john_doe",
    displayName: "John Doe",
    bio: "Full-stack developer passionate about React and Node.js. Coffee enthusiast ☕",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    banner: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=600&h=200&fit=crop",
    followers: 1250,
    following: 340,
    joinDate: "March 2020",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    verified: true
  },
  {
    id: 2,
    username: "jane_smith",
    displayName: "Jane Smith",
    bio: "UX Designer & Frontend Developer. Creating beautiful digital experiences 🎨",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=100&h=100&fit=crop&crop=face",
    banner: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=600&h=200&fit=crop",
    followers: 890,
    following: 210,
    joinDate: "January 2021",
    location: "New York, NY",
    website: "https://janesmith.design",
    verified: false
  },
  {
    id: 3,
    username: "alex_dev",
    displayName: "Alex Developer",
    bio: "Software engineer working on open source projects. Always learning something new 🚀",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    banner: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=200&fit=crop",
    followers: 2100,
    following: 455,
    joinDate: "June 2019",
    location: "Seattle, WA",
    website: "https://github.com/alexdev",
    verified: true
  },
  {
    id: 4,
    username: "sarah_designer",
    displayName: "Sarah Wilson",
    bio: "Product designer with 5+ years experience. Love minimalist design and good coffee ☕",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    banner: "https://images.unsplash.com/photo-1508138221679-760a23a2285b?w=600&h=200&fit=crop",
    followers: 675,
    following: 180,
    joinDate: "September 2020",
    location: "Austin, TX",
    website: "https://sarahwilson.design",
    verified: false
  },
  {
    id: 5,
    username: "mike_tech",
    displayName: "Mike Johnson",
    bio: "Tech enthusiast and startup founder. Building the future one line of code at a time 💻",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    banner: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=200&fit=crop",
    followers: 3200,
    following: 890,
    joinDate: "February 2018",
    location: "Los Angeles, CA",
    website: "https://miketech.com",
    verified: true
  }
];

export const mockTweets = [
  {
    id: 1,
    userId: 1,
    content: "Just finished building a new React component library! The developer experience is so much better with TypeScript. What are your favorite tools for building component libraries? 🔧",
    timestamp: "2025-07-17T10:30:00Z",
    likes: 45,
    retweets: 12,
    replies: 8,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=300&fit=crop"
  },
  {
    id: 2,
    userId: 2,
    content: "Working on a new design system for our app. The challenge is making it scalable while keeping it simple. Any tips from fellow designers? #DesignSystems #UX",
    timestamp: "2025-07-17T09:15:00Z",
    likes: 67,
    retweets: 23,
    replies: 15
  },
  {
    id: 3,
    userId: 3,
    content: "Open source contribution tip: Start small! Look for 'good first issue' labels. I started with fixing typos and now I'm a maintainer of several projects 🎉",
    timestamp: "2025-07-17T08:45:00Z",
    likes: 128,
    retweets: 89,
    replies: 32
  },
  {
    id: 4,
    userId: 1,
    content: "Hot take: Code reviews are more important than the code itself. They're opportunities to learn, teach, and improve the entire team's skills. 🧠",
    timestamp: "2025-07-16T16:20:00Z",
    likes: 203,
    retweets: 76,
    replies: 41
  },
  {
    id: 5,
    userId: 4,
    content: "Just wrapped up user interviews for our new feature. Key insight: what users say they want and what they actually need are often different things! 📊",
    timestamp: "2025-07-16T14:30:00Z",
    likes: 89,
    retweets: 34,
    replies: 19,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop"
  },
  {
    id: 6,
    userId: 5,
    content: "Excited to announce our startup just raised Series A! 🚀 We're hiring across engineering, design, and product. Building the future of remote work tools. DM me if interested!",
    timestamp: "2025-07-16T12:00:00Z",
    likes: 456,
    retweets: 187,
    replies: 94
  },
  {
    id: 7,
    userId: 2,
    content: "CSS Grid vs Flexbox: Use Grid for 2D layouts (rows and columns), Flexbox for 1D layouts (just rows or columns). Both are powerful, choose the right tool! 💡",
    timestamp: "2025-07-16T10:15:00Z",
    likes: 312,
    retweets: 145,
    replies: 67
  },
  {
    id: 8,
    userId: 3,
    content: "Today I learned about Web Components and I'm blown away! Native browser APIs for creating reusable components. The future of web development looks bright ✨",
    timestamp: "2025-07-15T18:45:00Z",
    likes: 178,
    retweets: 92,
    replies: 28,
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=500&h=300&fit=crop"
  }
];

// Current user (for authentication state)
export const currentUser = mockUsers[0];

// Following relationships (userId -> array of userIds they follow)
export const followingData = {
  1: [2, 3, 5],
  2: [1, 4],
  3: [1, 2, 4, 5],
  4: [1, 2, 3],
  5: [1, 3, 4]
};

// Helper functions
export const getUserById = (id) => mockUsers.find(user => user.id === id);

export const getTweetsByUserId = (userId) => 
  mockTweets.filter(tweet => tweet.userId === userId);

export const getAllTweets = () => 
  mockTweets.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

export const getFollowing = (userId) => 
  followingData[userId] || [];

export const getFollowers = (userId) => 
  Object.entries(followingData)
    .filter(([_, following]) => following.includes(userId))
    .map(([followerId, _]) => parseInt(followerId));

export const isFollowing = (currentUserId, targetUserId) => 
  getFollowing(currentUserId).includes(targetUserId);

export const searchUsers = (query) => 
  mockUsers.filter(user => 
    user.username.toLowerCase().includes(query.toLowerCase()) ||
    user.displayName.toLowerCase().includes(query.toLowerCase()) ||
    user.bio.toLowerCase().includes(query.toLowerCase())
  );

export const formatTimestamp = (timestamp) => {
  const now = new Date();
  const date = new Date(timestamp);
  const diff = now - date;
  
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (minutes < 1) return 'now';
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  if (days < 7) return `${days}d`;
  
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  });
};
