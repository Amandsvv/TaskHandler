import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Plus, Loader2, AlertCircle, FolderOpen, Trash2, Eye, X } from 'lucide-react';

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [deletingProjectId, setDeletingProjectId] = useState(null);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/projects`, {
          withCredentials: true,
        });
        setProjects(response.data.data);
      } catch (error) {
        setErrorMsg('Failed to fetch projects. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [baseUrl]);

  const confirmDelete = async (projectId) => {
    try {
      await axios.delete(`${baseUrl}/api/projects/${projectId}`, {
        withCredentials: true,
      });
      setProjects(projects.filter(project => project._id !== projectId));
    } catch (error) {
      setErrorMsg('Error deleting project. Please try again.');
    } finally {
      setDeletingProjectId(null);
    }
  };

  const projectColors = [
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600',
    'from-pink-500 to-pink-600',
    'from-green-500 to-green-600',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Your Projects
            </h1>
            <p className="text-gray-600">Manage and organize your tasks efficiently</p>
          </div>

          {projects.length < 4 ? (
            <Link
              to="/create-project"
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              <span>Add Project</span>
            </Link>
          ) : (
            <button
              disabled
              className="flex items-center space-x-2 px-6 py-3 bg-gray-300 text-gray-500 font-semibold rounded-lg cursor-not-allowed"
            >
              <span>Limit Reached (4/4)</span>
            </button>
          )}
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Projects</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{projects.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FolderOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Available Slots</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{4 - projects.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Plus className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Capacity</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{Math.round((projects.length / 4) * 100)}%</p>
              </div>
              <div className="w-full mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(projects.length / 4) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-600 font-medium">Loading your projects...</p>
          </div>
        ) : errorMsg ? (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-800 font-semibold">Error</p>
              <p className="text-red-700">{errorMsg}</p>
            </div>
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-6">
              <FolderOpen className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">No Projects Yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start organizing your work by creating your first project. You can create up to 4 projects.
            </p>
            <Link
              to="/create-project"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span>Create Your First Project</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={project._id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Card Header with Gradient */}
                <div className={`h-2 bg-gradient-to-r ${projectColors[index % projectColors.length]}`}></div>

                <div className="p-6">
                  {/* Delete Button */}
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${projectColors[index % projectColors.length]} rounded-lg flex items-center justify-center shadow-md`}>
                      <FolderOpen className="w-6 h-6 text-white" />
                    </div>
                    {deletingProjectId !== project._id && (
                      <button
                        onClick={() => setDeletingProjectId(project._id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                        title="Delete Project"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  {/* Project Info */}
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Delete Confirmation */}
                  {deletingProjectId === project._id && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-4 animate-fadeIn">
                      <div className="flex items-start space-x-3 mb-3">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-red-800 font-semibold text-sm">
                          Are you sure you want to delete this project? This action cannot be undone.
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => confirmDelete(project._id)}
                          className="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-200"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setDeletingProjectId(null)}
                          className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* View Details Button */}
                  <Link
                    to={`/project/${project._id}`}
                    className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;