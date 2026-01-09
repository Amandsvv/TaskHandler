import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User, Mail, Calendar, Shield, Loader2, AlertCircle, Edit, Settings } from 'lucide-react';

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    axios.get(`${baseUrl}/api/auth/check-auth`, { withCredentials: true })
      .then((res) => {
        setUser(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch user info");
        setLoading(false);
      });
  }, [baseUrl]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-red-50 border-l-4 border-red-500 rounded-lg p-6 flex items-start space-x-3">
          <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-800 font-semibold">Error</p>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Your Profile
          </h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-6">
          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32 relative">
            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center border-4 border-white">
                <span className="text-4xl font-bold text-white">
                  {getInitials(user.name || 'User')}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 pb-8 px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-1">
                  {user.name || 'User'}
                </h2>
                <p className="text-gray-600">{user.role || 'Member'}</p>
              </div>
              <button className="mt-4 sm:mt-0 flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-blue-900 mb-1">Email Address</p>
                    <p className="text-blue-800 font-medium truncate">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Member Since */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-purple-900 mb-1">Member Since</p>
                    <p className="text-purple-800 font-medium">{formatDate(user.createdAt)}</p>
                  </div>
                </div>
              </div>

              {/* Account Status */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-green-900 mb-1">Account Status</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-800 font-medium">Active</span>
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Role */}
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 border border-pink-200">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-pink-900 mb-1">User Role</p>
                    <p className="text-pink-800 font-medium capitalize">{user.role || 'Member'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Settings Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2"></div>
          <div className="p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Settings className="w-6 h-6 text-gray-700" />
              <h3 className="text-2xl font-bold text-gray-800">Account Settings</h3>
            </div>
            
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 group">
                <span className="font-medium text-gray-700 group-hover:text-blue-600">Change Password</span>
                <span className="text-gray-400 group-hover:text-blue-600">→</span>
              </button>
              
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 group">
                <span className="font-medium text-gray-700 group-hover:text-blue-600">Email Preferences</span>
                <span className="text-gray-400 group-hover:text-blue-600">→</span>
              </button>
              
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 group">
                <span className="font-medium text-gray-700 group-hover:text-blue-600">Privacy Settings</span>
                <span className="text-gray-400 group-hover:text-blue-600">→</span>
              </button>
              
              <button className="w-full flex items-center justify-between p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200 group">
                <span className="font-medium text-red-600">Delete Account</span>
                <span className="text-red-400 group-hover:text-red-600">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6">Your Activity</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-4xl font-bold mb-1">4</p>
              <p className="text-blue-100 text-sm">Max Projects</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold mb-1">0</p>
              <p className="text-blue-100 text-sm">Tasks Completed</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold mb-1">0</p>
              <p className="text-blue-100 text-sm">Active Tasks</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold mb-1">100%</p>
              <p className="text-blue-100 text-sm">On Time Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;