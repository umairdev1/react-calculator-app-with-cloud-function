import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";

const Signup = () => {
  // State variables for form inputs and other states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [error, setError] = useState(""); // State to manage error messages
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const { signup, googleAuth } = useAuth(); // Custom hook to get authentication methods
  const navigate = useNavigate(); // Hook to navigate to different routes

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      setLoading(true); // Set loading state to true
      setError(""); // Clear any existing error messages

      // Validate form inputs
      if (
        !firstName.trim() ||
        !lastName.trim() ||
        !email.trim() ||
        !password.trim()
      ) {
        setError("All fields are required.");
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        setLoading(false);
        return;
      }

      // Call signup function from auth context
      await signup(email, password, firstName, lastName);
      navigate("/"); // Navigate to the home page on successful signup
    } catch (error) {
      setError("Failed to create an account."); // Set error message on failure
      setLoading(false); // Set loading state to false
    }
    setLoading(false); // Set loading state to false
  };

  // Function to toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Function to handle sign up with Google
  const signInWithGoogle = async () => {
    setLoading(true); // Set loading state to true

    try {
      await googleAuth(); // Call Google auth function from auth context
      navigate("/"); // Navigate to the home page on successful Google sign up
    } catch (error) {
      setError(error.message); // Set error message on failure
    }
    setLoading(false); // Set loading state to false
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
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
          Sign Up
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2, width: "100%" }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="First Name"
            autoFocus
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Sign Up"}
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
              my: 2,
            }}
            disabled={loading}
          >
            Sign up with Google
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account? <Link to="/login">Sign In</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Signup;
