import React, { useState } from "react";
import { callFunction, firestore } from "../firebaseConfig";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Select,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";

const Calculator = () => {
  const { currentUser } = useAuth(); // Get the current user from the auth context
  const [num1, setNum1] = useState(""); // State for the first number input
  const [num2, setNum2] = useState(""); // State for the second number input
  const [operation, setOperation] = useState("add"); // State for the selected operation
  const [currency, setCurrency] = useState("USD"); // State for the selected currency
  const [result, setResult] = useState(null); // State for the calculation result
  const [loading, setLoading] = useState(false); // State to show loading spinner
  const [error, setError] = useState(""); // State to show error messages

  const handleCalculate = async () => {
    // Reset error and show loading spinner
    setError("");
    setLoading(true);

    // Input validation
    if (!num1 || isNaN(num1)) {
      setError("Please enter a valid number for Number 1.");
      setLoading(false);
      return;
    }

    if (!num2 || isNaN(num2)) {
      setError("Please enter a valid number for Number 2.");
      setLoading(false);
      return;
    }

    const calculateFunction = callFunction("calculate");

    try {
      // Call the calculate function with the input values and selected options
      const res = await calculateFunction({
        num1: parseFloat(num1),
        num2: parseFloat(num2),
        operation,
        currency,
      });
      setResult(res.data.result); // Set the result state

      // Save the calculation to Firestore if the user is logged in
      if (res) {
        if (currentUser) {
          const historyRef = doc(
            firestore,
            "users",
            currentUser.uid,
            "history",
            new Date().toISOString()
          );
          await setDoc(historyRef, {
            num1: parseFloat(num1),
            num2: parseFloat(num2),
            operation,
            currency,
            result: res.data.result,
          });
        }
      }
    } catch (error) {
      // Show error message if there is an error
      setError("Error calling the calculate function: " + error.message);
    } finally {
      // Hide loading spinner
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom>
            Calculator
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Number 1"
                type="number"
                variant="outlined"
                fullWidth
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                error={Boolean(error && !num1)}
                helperText={error && !num1 ? error : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Number 2"
                type="number"
                variant="outlined"
                fullWidth
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                error={Boolean(error && !num2)}
                helperText={error && !num2 ? error : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Operation</InputLabel>
                <Select
                  value={operation}
                  onChange={(e) => setOperation(e.target.value)}
                  label="Operation"
                >
                  <MenuItem value="add">Add</MenuItem>
                  <MenuItem value="subtract">Subtract</MenuItem>
                  <MenuItem value="multiply">Multiply</MenuItem>
                  <MenuItem value="divide">Divide</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Currency</InputLabel>
                <Select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  label="Currency"
                >
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleCalculate}
                sx={{ mt: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Calculate"}
              </Button>
            </Grid>
          </Grid>
          {result !== null && (
            <Typography variant="h6" sx={{ mt: 2 }}>
              Result: {result}
            </Typography>
          )}
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Calculator;
