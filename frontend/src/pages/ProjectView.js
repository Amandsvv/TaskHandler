import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProjectView() {
  const { id } = useParams(); // projectId
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskForm, setTaskForm] = useState({ title: '', description: '', status: 'Select status' });
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    fetchProject();
    fetchTasks();
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/projects/${id}`, {
        withCredentials: true,
      });
      setProject(response.data.data);
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/tasks/${id}`, {
        withCredentials: true,
      });
      setTasks(response.data.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/api/tasks`, {
        ...taskForm,
        projectId: id
      }, { withCredentials: true });

      setTasks([...tasks, response.data.data]);
      setTaskForm({ title: '', description: '', status: 'Pending' });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      await axios.delete(`${baseUrl}/api/tasks/${taskId}`, {
        withCredentials: true,
      });
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditClick = (task) => {
    setEditTask({ ...task });
  };

  const handleEditChange = (e) => {
    setEditTask({ ...editTask, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      const response = await axios.put(`${baseUrl}/api/tasks/${editTask._id}`, editTask, {
        withCredentials: true,
      });
      const updatedTask = response.data.data;
      setTasks(tasks.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
      setEditTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleTaskChange = (e) => {
    setTaskForm({ ...taskForm, [e.target.name]: e.target.value });
  };

  if (!project) return <div className="text-center mt-5">Loading project...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-3 text-primary">{project.title}</h2>
      <p className="text-muted">{project.description}</p>

      <hr />

      <h4 className="mt-4 mb-3">Add Task</h4>
      <form onSubmit={handleTaskSubmit} className="row g-3 mb-4">
        <div className="col-md-4">
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            className="form-control"
            value={taskForm.title}
            onChange={handleTaskChange}
            required
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="description"
            placeholder="Task Description"
            className="form-control"
            value={taskForm.description}
            onChange={handleTaskChange}
            required
          />
        </div>
        <div className="col-md-3">
          <select
            name="status"
            className="form-select"
            value={taskForm.status}
            onChange={handleTaskChange}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="col-md-1">
          <button className="btn btn-success w-100" type="submit">Add</button>
        </div>
      </form>

      <h4 className="mb-3">Tasks</h4>
      {tasks.length > 0 ? (
        <div className="row">
          {tasks.map((task) => (
            <div className="col-md-6 mb-3" key={task._id}>
              <div className="card shadow-sm border-info">
                <div className="card-body">
                  <h5 className="card-title">{task.title}</h5>
                  <p className="card-text">{task.description}</p>
                  <p className="card-text">
                    <span className="badge bg-secondary">Status: {task.status}</span>
                  </p>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => handleEditClick(task)}
                    data-bs-toggle="modal"
                    data-bs-target="#editTaskModal"
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleTaskDelete(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted">No tasks available for this project.</p>
      )}

      {/* Edit Task Modal */}
      <div className="modal fade" id="editTaskModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            {editTask && (
              <>
                <div className="modal-header">
                  <h5 className="modal-title">Edit Task</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    name="title"
                    className="form-control mb-2"
                    value={editTask.title}
                    onChange={handleEditChange}
                  />
                  <input
                    type="text"
                    name="description"
                    className="form-control mb-2"
                    value={editTask.description}
                    onChange={handleEditChange}
                  />
                  <select
                    name="status"
                    className="form-select"
                    value={editTask.status}
                    onChange={handleEditChange}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    onClick={handleEditSubmit}
                  >
                    Save Changes
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectView;
