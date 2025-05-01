import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
  const { isLoggedIn, user, setIsLoggedIn, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const handleLogout = () => {
    axios.post(`${baseUrl}/api/auth/logout`, {}, { withCredentials: true })
      .then(() => {
        setIsLoggedIn(false);
        setUser(null);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error logging out", error);
      });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary" to="/dashboard">TaskHandler</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
            <Link className="nav-link" to="/profile">Profile</Link>
          </div>

          {!isLoggedIn ? (
            <div className="d-flex">
              <Link to="/" className="btn btn-primary me-2">Login</Link>
              <Link to="/signup" className="btn btn-outline-secondary">Register</Link>
            </div>
          ) : (
            <div className="d-flex">
              <span className="navbar-text me-3">Welcome, {user?.name || "User"}</span>
              <button onClick={handleLogout} className="btn btn-danger">Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
