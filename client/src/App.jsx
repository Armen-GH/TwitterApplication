import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import About from './pages/About';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Settings from './pages/Settings';
import FollowList from './pages/FollowList';
import NotFound from './pages/NotFound';

import { requestNotificationPermission, subscribeUserToPush } from './utils/pushUtils';

const App = () => {
  
  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(async (registration) => {
          console.log('Service Worker registered:', registration);
          await requestNotificationPermission();
          await subscribeUserToPush(registration);
        })
        .catch((err) => {
          console.error('Service Worker registration failed:', err);
        });
    }
  }, []);

  

  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />

          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/search" element={<Layout><Search /></Layout>} />
          <Route path="/profile/:username" element={<Layout><Profile /></Layout>} />
          <Route path="/profile/:username/following" element={<Layout><FollowList /></Layout>} />
          <Route path="/profile/:username/followers" element={<Layout><FollowList /></Layout>} />
          <Route path="/settings/*" element={<Layout><Settings /></Layout>} />
          <Route
            path="/notifications"
            element={
              <Layout>
                <div className="p-8 text-center">
                  <h2 className="text-2xl font-bold">Notifications</h2>
                  <p className="text-gray-500">Coming soon...</p>
                </div>
              </Layout>
            }
          />
          <Route
            path="/messages"
            element={
              <Layout>
                <div className="p-8 text-center">
                  <h2 className="text-2xl font-bold">Messages</h2>
                  <p className="text-gray-500">Coming soon...</p>
                </div>
              </Layout>
            }
          />
          <Route
            path="/bookmarks"
            element={
              <Layout>
                <div className="p-8 text-center">
                  <h2 className="text-2xl font-bold">Bookmarks</h2>
                  <p className="text-gray-500">Coming soon...</p>
                </div>
              </Layout>
            }
          />
          <Route
            path="/more"
            element={
              <Layout>
                <div className="p-8 text-center">
                  <h2 className="text-2xl font-bold">More</h2>
                  <p className="text-gray-500">Coming soon...</p>
                </div>
              </Layout>
            }
          />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
