/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.calculate = functions.https.onCall((data, context) => {
  const { num1, num2, operation, currency } = data;

  if (!num1 || !num2 || !operation) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Missing input data"
    );
  }

  let result;
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
      if (num2 === 0) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "Division by zero"
        );
      }
      result = num1 / num2;
      break;
    default:
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Invalid operation"
      );
  }

  let formattedResult;
  if (currency === "EUR") {
    formattedResult = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(result);
  } else {
    formattedResult = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(result);
  }

  return { result: formattedResult };
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
