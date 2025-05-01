import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [deletingProjectId, setDeletingProjectId] = useState(null); // Track which project is being deleted
  const baseUrl = process.env.REACT_APP_BASE_URL;

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

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">Your Projects</h2>
        {projects.length < 4 ? (
          <Link to="/create-project" className="btn btn-success">
            <i className="bi bi-plus-lg"></i> Add Project
          </Link>
        ) : (
          <button className="btn btn-secondary" disabled>
            Limit Reached (4 Projects)
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : errorMsg ? (
        <div className="alert alert-danger">{errorMsg}</div>
      ) : projects.length === 0 ? (
        <div className="alert alert-warning">No projects found. Start by adding one!</div>
      ) : (
        <div className="row">
          {projects.map((project) => (
            <div className="col-md-6 col-lg-4 mb-4" key={project._id}>
              <div className="card shadow-sm border-0 h-100 position-relative" style={{ background: '#f8f9fa' }}>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-dark">{project.title}</h5>
                  <p className="card-text text-muted">{project.description}</p>

                  {/* Delete Icon Button */}
                  <button
                    className="btn btn-sm btn-outline-danger position-absolute top-0 end-0 m-2"
                    onClick={() => setDeletingProjectId(project._id)}
                    title="Delete Project"
                  >
                    <i className="bi bi-trash"></i>
                  </button>

                  {/* Delete Confirmation Section */}
                  {deletingProjectId === project._id && (
                    <div className="mt-3 border rounded p-2 bg-light">
                      <p className="mb-2 text-danger">Are you sure you want to delete this project?</p>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => confirmDelete(project._id)}
                        >
                          Confirm
                        </button>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => setDeletingProjectId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="mt-auto">
                    <Link to={`/project/${project._id}`} className="btn btn-outline-primary w-100">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
