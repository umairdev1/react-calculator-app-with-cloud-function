import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; // Import the authentication context
import { firestore } from "../firebaseConfig"; // Import Firestore configuration
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore"; // Import Firestore functions
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardActions,
  Snackbar,
  Alert,
  CircularProgress,
  Grid,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"; // Import Material-UI components
import {
  Delete as DeleteIcon,
  Calculate as CalculateIcon,
} from "@mui/icons-material"; // Import Material-UI icons

const History = () => {
  const { currentUser } = useAuth(); // Get the current user from the authentication context
  const [history, setHistory] = useState([]); // State to store the user's calculation history
  const [loading, setLoading] = useState(true); // State to manage the loading state
  const [successMessage, setSuccessMessage] = useState(""); // State to store success messages
  const [deleteId, setDeleteId] = useState(null); // State to store the ID of the entry to be deleted

  useEffect(() => {
    // Fetch the user's calculation history from Firestore
    const fetchHistory = async () => {
      if (currentUser) {
        const historyRef = collection(
          firestore,
          "users",
          currentUser.uid,
          "history"
        );
        const historySnapshot = await getDocs(historyRef);
        const historyList = historySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHistory(historyList); // Set the fetched history to the state
      }
      setLoading(false); // Set loading to false after fetching data
    };

    fetchHistory(); // Call the fetchHistory function on component mount
  }, [currentUser]);

  // Handle deletion of a history entry
  const handleDelete = async (id) => {
    if (currentUser) {
      const docRef = doc(firestore, "users", currentUser.uid, "history", id);
      await deleteDoc(docRef); // Delete the document from Firestore
      setHistory((prevHistory) => prevHistory.filter((item) => item.id !== id)); // Update the state to remove the deleted entry
      setSuccessMessage("History entry deleted successfully."); // Set a success message
      setDeleteId(null); // Reset the deleteId state
    }
  };

  // Handle opening of the delete confirmation dialog
  const handleDeleteConfirmation = (id) => {
    setDeleteId(id); // Set the deleteId state to the ID of the entry to be deleted
  };

  // Handle closing of the delete confirmation dialog
  const handleCloseDeleteDialog = () => {
    setDeleteId(null); // Reset the deleteId state
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography component="h1" variant="h4" gutterBottom>
        Calculation History
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />{" "}
          {/* Show a loading spinner while data is being fetched */}
        </Box>
      ) : history.length === 0 ? (
        <Typography variant="body1" align="center">
          No history available. {/* Show a message if there is no history */}
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {history.map((entry) => (
            <Grid item xs={12} key={entry.id}>
              <Card
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  boxShadow: 3,
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                  <CalculateIcon /> {/* Show a calculator icon */}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body1">
                    {entry.num1} {entry.operation} {entry.num2} = {entry.result}{" "}
                    ({entry.currency}) {/* Display the calculation details */}
                  </Typography>
                </Box>
                <CardActions>
                  <Button
                    onClick={() => handleDeleteConfirmation(entry.id)}
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                  >
                    Delete {/* Button to delete the entry */}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage("")}
      >
        <Alert
          onClose={() => setSuccessMessage("")}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage} {/* Show success message in a snackbar */}
        </Alert>
      </Snackbar>
      <Dialog open={Boolean(deleteId)} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this history entry? This action
            cannot be undone.
          </DialogContentText>{" "}
          {/* Confirmation dialog for deletion */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel {/* Cancel button */}
          </Button>
          <Button onClick={() => handleDelete(deleteId)} color="secondary">
            Delete {/* Confirm delete button */}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default History;
