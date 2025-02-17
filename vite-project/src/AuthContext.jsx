import React, { createContext, useState, useEffect, useContext } from 'react';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const AuthContext = createContext();

// Custom hook to check authentication for admin routes
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // To track if we already performed the check

  const checkAuth = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}auth_check.php`, {
        credentials: 'include', // Ensure the browser sends auth headers
      });

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
      setIsAuthenticated(false);
    } finally {
      setIsChecked(true); // Mark that we've done the check
    }
  };

  useEffect(() => {
    // Only perform auth check for admin pages or when it's required
    if (window.location.pathname.includes('admin') && !isChecked) {
      checkAuth();
    } else {
      setIsChecked(true); // Skip the check for public pages
    }
  }, [isChecked]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;