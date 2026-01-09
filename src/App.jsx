import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import { AuthProvider } from './context/AuthContext';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ProjectView from './pages/ProjectView';
import CreateProject from './pages/CreateProject';
import Profile from './pages/Profile';
import LandingPage from './pages/LandingPage';
import './App.css'

function App() {
  return (
     <Router>
      <AuthProvider>
        <Navbar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/project/:id" element={<ProjectView />} />
            <Route path="/create-project" element={<CreateProject />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
