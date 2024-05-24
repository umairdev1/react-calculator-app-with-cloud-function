import React from "react";
import { useAuth } from "../context/AuthContext"; // Import custom authentication context
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Divider,
  Grid,
} from "@mui/material"; // Import Material UI components
import { auth } from "../firebaseConfig"; // Import Firebase authentication configuration
import { deepPurple } from "@mui/material/colors"; // Import color utility from Material UI

const UserInfo = () => {
  // Extract the current user from the authentication context
  const { currentUser } = useAuth();

  // Function to handle user sign-out
  const handleSignOut = () => {
    auth.signOut(); // Sign out the current user using Firebase auth
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      {/* Centered card container */}
      <Card elevation={4} sx={{ borderRadius: 3 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              pb: 2,
            }}
          >
            {/* Avatar displaying the first letter of the user's name */}
            <Avatar
              sx={{
                bgcolor: deepPurple[500],
                width: 72,
                height: 72,
                mb: 2,
              }}
            >
              {currentUser?.displayName?.charAt(0).toUpperCase()}
            </Avatar>
            {/* Header */}
            <Typography
              component="h1"
              variant="h5"
              fontWeight="bold"
              gutterBottom
            >
              User Information
            </Typography>
            <Divider sx={{ width: "100%", mb: 2 }} />
            {/* Display user information if user is signed in */}
            {currentUser ? (
              <>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      <strong>Name:</strong> {currentUser.displayName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      <strong>Email:</strong> {currentUser.email}
                    </Typography>
                  </Grid>
                </Grid>
                {/* Sign out button */}
                <CardActions sx={{ width: "100%", justifyContent: "center" }}>
                  <Button
                    onClick={handleSignOut}
                    variant="contained"
                    color="primary"
                    sx={{
                      borderRadius: 3,
                      textTransform: "none",
                      width: "50%",
                    }}
                  >
                    Sign Out
                  </Button>
                </CardActions>
              </>
            ) : (
              // Display message if no user is signed in
              <Typography variant="body1">
                No user is currently signed in.
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserInfo;
