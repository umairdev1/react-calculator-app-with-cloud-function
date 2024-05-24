import { Navigate } from "react-router-dom"; // Import Navigate from react-router-dom for redirection
import { useAuth } from "../context/AuthContext"; // Import useAuth custom hook from AuthContext

/**
 * PrivateRoute component
 * Protects routes that require authentication.
 * If the user is authenticated, it renders the children components.
 * If the user is not authenticated, it redirects to the login page.
 */
const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth(); // Get the current user from AuthContext
  return currentUser ? children : <Navigate to="/login" replace />; // If user is authenticated, render children, otherwise redirect to login
};

/**
 * PublicRoute component
 * Protects routes that should only be accessible to unauthenticated users.
 * If the user is authenticated, it redirects to the home page.
 * If the user is not authenticated, it renders the children components.
 */
const PublicRoute = ({ children }) => {
  const { currentUser } = useAuth(); // Get the current user from AuthContext
  return currentUser ? <Navigate to="/" replace /> : children; // If user is authenticated, redirect to home, otherwise render children
};

export { PrivateRoute, PublicRoute }; // Export the PrivateRoute and PublicRoute components
