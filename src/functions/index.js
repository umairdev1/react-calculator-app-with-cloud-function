const functions = require("firebase-functions"); // Import Firebase Functions module
const admin = require("firebase-admin"); // Import Firebase Admin module for initializing Firebase Admin SDK
admin.initializeApp(); // Initialize the Firebase Admin SDK

// Define the Firebase Cloud Function named 'calculate' using the 'https.onCall' method
exports.calculate = functions.https.onCall((data, context) => {
  // Destructure input data from the request
  const { num1, num2, operation, currency } = data;

  // Validate input data
  if (!num1 || !num2 || !operation) {
    // Throw an error if any required input data is missing
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Missing input data"
    );
  }

  let result; // Declare a variable to store the calculation result

  // Perform arithmetic operation based on the specified operation
  switch (operation) {
    case "add":
      result = num1 + num2;
      break;
    case "subtract":
      result = num1 - num2;
      break;
    case "multiply":
      result = num1 * num2;
      break;
    case "divide":
      // Check for division by zero
      if (num2 === 0) {
        // Throw an error if attempting to divide by zero
        throw new functions.https.HttpsError(
          "invalid-argument",
          "Division by zero"
        );
      }
      result = num1 / num2;
      break;
    default:
      // Throw an error for an invalid operation
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Invalid operation"
      );
  }

  let formattedResult; // Declare a variable to store the formatted result

  // Format the result based on the specified currency
  if (currency === "EUR") {
    // Format result as Euro if the currency is EUR
    formattedResult = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(result);
  } else {
    // Format result as US Dollar if the currency is not EUR
    formattedResult = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(result);
  }

  // Return the formatted result
  return { result: formattedResult };
});
