import React from "react"; // Import React library
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import React Router components
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider context for authentication
import Login from "./components/Login"; // Import Login component
import Signup from "./components/Signup"; // Import Signup component
import Calculator from "./components/Calculator"; // Import Calculator component
import History from "./components/History"; // Import History component
import UserInfo from "./components/UserInfo"; // Import UserInfo component
import Layout from "./layout"; // Import Layout component
import { PrivateRoute, PublicRoute } from "./utils/route"; // Import PrivateRoute and PublicRoute components for route protection

/**
 * App component
 * The main component of the application that sets up routing and provides authentication context.
 */
const App = () => {
  return (
    <Router>
      {/* Provide authentication context to the entire app */}
      <AuthProvider>
        {/* Layout component wraps the application content */}
        <Layout>
          <Routes>
            {/* Public routes (accessible without authentication) */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
            {/* Private routes (accessible only with authentication) */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Calculator />
                </PrivateRoute>
              }
            />
            <Route
              path="/history"
              element={
                <PrivateRoute>
                  <History />
                </PrivateRoute>
              }
            />
            <Route
              path="/userinfo"
              element={
                <PrivateRoute>
                  <UserInfo />
                </PrivateRoute>
              }
            />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
};

export default App; // Export the App component
