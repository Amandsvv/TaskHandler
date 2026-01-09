import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const { isLoggedIn, user, setIsLoggedIn, setUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white text-sm font-bold">T</span>
            </div>
            <span>TaskHandler</span>
          </Link>

          {/* Desktop Navigation */}
          {isLoggedIn && (
            <div className="hidden md:flex items-center space-x-1">
                <Link 
                to="/dashboard" 
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 font-medium"
                >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
                </Link>
                <Link 
                to="/profile" 
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 font-medium"
                >
                <User className="w-4 h-4" />
                <span>Profile</span>
                </Link>
            </div>
          )}

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            {!isLoggedIn ? (
              <>
                <Link 
                  to="/login" 
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="px-5 py-2 rounded-lg border-2 border-gray-300 text-gray-700 font-medium hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-white text-sm font-semibold">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                  <span className="text-gray-700 font-medium">
                    {user?.name || "User"}
                  </span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-5 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-fadeIn">
            <div className="flex flex-col space-y-2">
                { isLoggedIn && (
                    <>
                        <Link 
                            to="/dashboard" 
                            onClick={toggleMenu}
                            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 font-medium"
                        >
                            <LayoutDashboard className="w-5 h-5" />
                            <span>Dashboard</span>
                        </Link>
                        <Link 
                            to="/profile" 
                            onClick={toggleMenu}
                            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 font-medium"
                        >
                            <User className="w-5 h-5" />
                            <span>Profile</span>
                        </Link>
                    </>
                )}
              <div className="pt-4 border-t border-gray-100 space-y-2">
                {!isLoggedIn ? (
                  <>
                    <Link 
                      to="/login" 
                      onClick={toggleMenu}
                      className="block w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md"
                    >
                      Login
                    </Link>
                    <Link 
                      to="/signup" 
                      onClick={toggleMenu}
                      className="block w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-gray-700 text-center font-medium hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                    >
                      Register
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-white font-semibold">
                          {user?.name?.charAt(0).toUpperCase() || "U"}
                        </span>
                      </div>
                      <span className="text-gray-700 font-medium">
                        Welcome, {user?.name || "User"}
                      </span>
                    </div>
                    <button 
                      onClick={() => {
                        handleLogout();
                        toggleMenu();
                      }}
                      className="flex items-center justify-center space-x-2 w-full px-4 py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}