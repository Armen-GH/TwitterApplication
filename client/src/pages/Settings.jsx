import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Camera, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Settings = () => {
  const { user, updateProfile } = useApp();
  const [formData, setFormData] = useState({
    displayName: user.displayName,
    bio: user.bio,
    location: user.location || '',
    website: user.website || '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      updateProfile(formData);
      setIsSaving(false);
      alert('Profile updated successfully!');
    }, 1000);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setIsSaving(false);
      alert('Password updated successfully!');
    }, 1000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const tabs = [
    { id: 'profile', name: 'Edit Profile' },
    { id: 'password', name: 'Change Password' },
    { id: 'privacy', name: 'Privacy & Safety' },
    { id: 'notifications', name: 'Notifications' },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-black/80 backdrop-blur-md border-b border-gray-800 p-4 flex items-center space-x-4">
        <Link to={`/profile/${user.username}`} className="p-2 hover:bg-gray-900 rounded-full transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold">Settings</h1>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 border-r border-gray-800 min-h-screen">
          <nav className="p-4 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-gray-800 text-white font-medium'
                    : 'text-gray-400 hover:bg-gray-900 hover:text-white'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-4xl">
          {activeTab === 'profile' && (
            <div className="p-8 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Edit Profile</h2>
              
              <form onSubmit={handleProfileSubmit} className="space-y-8">
                {/* Profile Picture */}
                <div className="flex items-start space-x-6 p-8 bg-gray-900/30 rounded-2xl min-h-[140px]">
                  <div className="relative flex-shrink-0">
                    <img
                      src={user.avatar}
                      alt={user.displayName}
                      className="w-28 h-28 rounded-full"
                    />
                    <button
                      type="button"
                      className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                    >
                      <Camera size={28} className="text-white" />
                    </button>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="font-bold text-lg mb-3">Profile Picture</h3>
                    <p className="text-gray-400 text-sm mb-6">JPG, GIF or PNG. Max size 2MB.</p>
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        className="px-6 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors"
                      >
                        Upload
                      </button>
                      <button
                        type="button"
                        className="px-6 py-2 border border-gray-600 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                {/* Banner */}
                <div className="p-6 bg-gray-900/30 rounded-2xl">
                  <h3 className="font-bold text-lg mb-4">Banner</h3>
                  <div className="h-40 bg-gray-800 rounded-xl relative overflow-hidden">
                    {user.banner && (
                      <img
                        src={user.banner}
                        alt="Profile banner"
                        className="w-full h-full object-cover"
                      />
                    )}
                    <button
                      type="button"
                      className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                    >
                      <Camera size={28} className="text-white" />
                    </button>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                  <div className="p-6 bg-gray-900/30 rounded-2xl">
                    <label htmlFor="displayName" className="block text-lg font-semibold text-gray-200 mb-3">
                      Display Name
                    </label>
                    <input
                      type="text"
                      id="displayName"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-4 text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      maxLength="50"
                    />
                    <p className="text-gray-400 text-sm mt-2">{formData.displayName.length}/50</p>
                  </div>

                  <div className="p-6 bg-gray-900/30 rounded-2xl">
                    <label htmlFor="bio" className="block text-lg font-semibold text-gray-200 mb-3">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-4 text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                      maxLength="160"
                    />
                    <p className="text-gray-400 text-sm mt-2">{formData.bio.length}/160</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gray-900/30 rounded-2xl">
                      <label htmlFor="location" className="block text-lg font-semibold text-gray-200 mb-3">
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-4 text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        maxLength="30"
                      />
                      <p className="text-gray-400 text-sm mt-2">{formData.location.length}/30</p>
                    </div>

                    <div className="p-6 bg-gray-900/30 rounded-2xl">
                      <label htmlFor="website" className="block text-lg font-semibold text-gray-200 mb-3">
                        Website
                      </label>
                      <input
                        type="url"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-4 text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        maxLength="100"
                      />
                      <p className="text-gray-400 text-sm mt-2">{formData.website.length}/100</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-6">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-8 py-4 bg-blue-500 text-white font-bold text-lg rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'password' && (
            <div className="p-8 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Change Password</h2>
              
              <form onSubmit={handlePasswordSubmit} className="space-y-8">
                <div className="p-6 bg-gray-900/30 rounded-2xl">
                  <label htmlFor="currentPassword" className="block text-lg font-semibold text-gray-200 mb-3">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-4 text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div className="p-6 bg-gray-900/30 rounded-2xl">
                  <label htmlFor="newPassword" className="block text-lg font-semibold text-gray-200 mb-3">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-4 text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    minLength="8"
                    required
                  />
                  <p className="text-gray-400 text-sm mt-2">Must be at least 8 characters long</p>
                </div>

                <div className="p-6 bg-gray-900/30 rounded-2xl">
                  <label htmlFor="confirmPassword" className="block text-lg font-semibold text-gray-200 mb-3">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-4 text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div className="flex justify-end pt-6">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-8 py-4 bg-blue-500 text-white font-bold text-lg rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {(activeTab === 'privacy' || activeTab === 'notifications') && (
            <div className="p-8 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">
                {activeTab === 'privacy' ? 'Privacy & Safety' : 'Notifications'}
              </h2>
              <div className="text-center py-16">
                <div className="bg-gray-900/30 rounded-2xl p-12">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🚧</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Coming Soon</h3>
                  <p className="text-gray-400 text-lg">
                    We're working hard to bring you this feature. Stay tuned!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
