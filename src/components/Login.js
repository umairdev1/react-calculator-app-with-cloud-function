import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase authentication functions
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material"; // Import Material-UI components
import { Link, useNavigate } from "react-router-dom"; // Import routing functions
import GoogleIcon from "@mui/icons-material/Google"; // Import Google icon
import { useAuth } from "../context/AuthContext"; // Import authentication context

const Login = () => {
  // State variables to manage email, password, loading state, and errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const auth = getAuth(); // Initialize Firebase authentication
  const navigate = useNavigate(); // Hook for navigation
  const { googleAuth } = useAuth(); // Get Google authentication function from context

  // Function to sign in with Google
  const signInWithGoogle = async () => {
    setLoading(true); // Set loading state to true
    try {
      await googleAuth(); // Attempt Google sign-in
      navigate("/"); // Navigate to home page on success
    } catch (error) {
      setError(error.message); // Set error message on failure
    }
    setLoading(false); // Set loading state to false
  };

  // Function to sign in with email and password
  const signInWithEmail = async () => {
    setLoading(true); // Set loading state to true
    try {
      await signInWithEmailAndPassword(auth, email, password); // Attempt email/password sign-in
      navigate("/"); // Navigate to home page on success
    } catch (error) {
      setError(error.message); // Set error message on failure
    }
    setLoading(false); // Set loading state to false
  };

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value); // Update email state
    setError(""); // Clear error message
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value); // Update password state
    setError(""); // Clear error message
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      {/* Container for the login form */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 1,
          boxShadow: 3,
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          Sign In
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2, width: "100%" }}>
            {error} {/* Display error message if present */}
          </Alert>
        )}

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email Address"
          autoComplete="email"
          autoFocus
          onChange={handleEmailChange}
          error={!!error && !email}
          helperText={!!error && !email ? "Email is required" : ""}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={handlePasswordChange}
          error={!!error && !password}
          helperText={!!error && !password ? "Password is required" : ""}
        />
        <Button
          onClick={signInWithEmail}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
          {/* Show loading spinner or "Sign In" text based on loading state */}
        </Button>
        <Button
          onClick={signInWithGoogle}
          variant="contained"
          color="secondary"
          fullWidth
          startIcon={<GoogleIcon />}
          sx={{
            backgroundColor: "#4285F4",
            "&:hover": {
              backgroundColor: "#357ae8",
            },
            m: 2,
          }}
          disabled={loading}
        >
          Sign in with Google
          {/* Button for Google sign-in */}
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account? <Link to="/signup">Sign Up</Link>
          {/* Link to the sign-up page */}
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
