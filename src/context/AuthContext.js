import React, { useContext, useEffect, useState } from "react";
import { auth, firestore } from "../firebaseConfig"; // Import Firebase authentication and Firestore configuration
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth"; // Import Firebase authentication methods
import { doc, getDoc, setDoc } from "firebase/firestore"; // Import Firestore methods

// Create an authentication context
const AuthContext = React.createContext();

// Custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// Authentication provider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null); // State to store the current user
  const [loading, setLoading] = useState(true); // State to handle loading state

  // Effect to handle authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Set the current user when the authentication state changes
      setLoading(false); // Set loading to false once the user is set
    });

    // Cleanup function to unsubscribe from the listener
    return unsubscribe;
  }, []);

  // Function to handle user sign-up
  const signup = async (email, password, firstName, lastName) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ); // Create a new user with email and password
    const user = userCredential.user;
    await updateProfile(user, {
      displayName: `${firstName} ${lastName}`,
    }); // Update the user's profile with first and last name
    await setDoc(doc(firestore, "users", user.uid), {
      firstName,
      lastName,
      email,
    }); // Create a new document in Firestore for the user
    setCurrentUser({ ...user, firstName, lastName }); // Set the current user with the new data
  };

  // Function to handle Google authentication
  const googleAuth = async () => {
    const provider = new GoogleAuthProvider(); // Create a new GoogleAuthProvider instance
    try {
      const result = await signInWithPopup(auth, provider); // Sign in with Google
      const user = result.user;
      const userRef = doc(firestore, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        const userData = {
          firstName: user.displayName.split(" ")[0],
          lastName: user.displayName.split(" ")[1] || "",
          email: user.email,
        };
        await setDoc(userRef, userData); // Create a new document in Firestore if it doesn't exist
      }
      setCurrentUser({ ...user, ...(docSnap.data() || {}) }); // Set the current user with the new data
    } catch (error) {
      console.error("Error signing in with Google: ", error.message); // Log any errors that occur during Google sign-in
    }
  };

  // Function to handle user login
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password); // Sign in with email and password
  };

  // Function to handle user logout
  const logout = () => {
    return signOut(auth); // Sign out the current user
  };

  // Value object to provide the current user and authentication methods to the context
  const value = {
    currentUser,
    signup,
    login,
    logout,
    googleAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Render children only when not loading */}
    </AuthContext.Provider>
  );
}
