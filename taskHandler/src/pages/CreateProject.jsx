import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FolderPlus, Loader2, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';

function CreateProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!title || !description) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${baseUrl}/api/projects`,
        { title, description },
        { withCredentials: true }
      );
      setSuccessMsg('Project created successfully!');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Something went wrong. Try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-4">
            <FolderPlus className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Create New Project
          </h2>
          <p className="text-gray-600">Start organizing your tasks with a new project</p>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="font-medium">Back to Dashboard</span>
        </button>

        {/* Alert Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start space-x-3 animate-fadeIn">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-800 font-medium">Error</p>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg flex items-start space-x-3 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-green-800 font-medium">Success</p>
              <p className="text-green-700 text-sm">{successMsg}</p>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2"></div>
          
          <form onSubmit={handleSubmit} className="p-8">
            {/* Project Title Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project Title
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="e.g., Website Redesign, Mobile App Development"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
              />
              <p className="mt-1 text-xs text-gray-500">Choose a clear and descriptive title</p>
            </div>

            {/* Description Textarea */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project Description
                <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none transition-all duration-200 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Describe the goals, scope, and key objectives of your project..."
                rows="6"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading}
              ></textarea>
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-gray-500">Provide detailed information about your project</p>
                <span className="text-xs text-gray-400">{description.length} characters</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:hover:transform-none"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creating Project...</span>
                </>
              ) : (
                <>
                  <FolderPlus className="w-5 h-5" />
                  <span>Create Project</span>
                </>
              )}
            </button>

            {/* Helper Text */}
            <p className="mt-4 text-center text-xs text-gray-500">
              You can edit project details anytime after creation
            </p>
          </form>
        </div>

        {/* Additional Info Card */}
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">💡 Quick Tips</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Use descriptive titles to easily identify projects later</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Include project goals and deadlines in the description</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>You can add tasks and team members after project creation</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CreateProject;