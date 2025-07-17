import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Settings from './pages/Settings';
import FollowList from './pages/FollowList';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/profile/:username/following" element={<FollowList />} />
            <Route path="/profile/:username/followers" element={<FollowList />} />
            <Route path="/settings/*" element={<Settings />} />
            <Route path="/notifications" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Notifications</h2><p className="text-gray-500">Coming soon...</p></div>} />
            <Route path="/messages" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Messages</h2><p className="text-gray-500">Coming soon...</p></div>} />
            <Route path="/bookmarks" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Bookmarks</h2><p className="text-gray-500">Coming soon...</p></div>} />
            <Route path="/more" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">More</h2><p className="text-gray-500">Coming soon...</p></div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;
