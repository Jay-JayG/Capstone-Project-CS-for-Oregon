import { Navigate, useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import AuthContext from './AuthContext'; // Import the AuthContext

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const { isAuthenticated } = useContext(AuthContext); // Use the authentication state from context
    const location = useLocation(); // Get the current route location

    // Redirect if the route is protected (contains "admin") and user is not authenticated
    useEffect(() => {
        if (location.pathname.includes('admin') && !isAuthenticated) {
            // Optionally, you can trigger a redirect here for better user experience
        }
    }, [location, isAuthenticated]);

    // Conditionally render the protected route or redirect
    return isAuthenticated || !location.pathname.includes('admin') 
        ? <Component {...rest} /> 
        : <Navigate to="/" />;
};

export default ProtectedRoute;