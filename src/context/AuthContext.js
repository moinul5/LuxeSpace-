"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import { auth, googleProvider } from "@/firebase/config";

const AuthContext = createContext({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  loginWithGoogle: async () => {},
  logout: async () => {}
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Monitor auth state changes (handles both Firebase and Mock Auth fallbacks)
  useEffect(() => {
    if (!auth) {
      // Mock Auth Fallback Mode
      const sessionUser = localStorage.getItem("luxespace_session_user");
      if (sessionUser) {
        try {
          setUser(JSON.parse(sessionUser));
        } catch (e) {
          console.error("Failed to parse mock session user", e);
        }
      }
      setLoading(false);
      return;
    }

    // Real Firebase Auth
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    }, (error) => {
      console.error("Auth state change error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    
    if (!auth) {
      // Mock Login
      await new Promise((resolve) => setTimeout(resolve, 600));
      const users = JSON.parse(localStorage.getItem("luxespace_mock_users") || "[]");
      const found = users.find((u) => u.email === email && u.password === password);
      
      if (!found) {
        setLoading(false);
        const err = new Error("Invalid email or password.");
        err.code = "auth/invalid-credential";
        throw err;
      }
      
      const sessionUser = { uid: found.uid, email: found.email, displayName: found.displayName };
      localStorage.setItem("luxespace_session_user", JSON.stringify(sessionUser));
      setUser(sessionUser);
      setLoading(false);
      return sessionUser;
    }

    // Real Firebase Login
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      return result.user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, displayName) => {
    setLoading(true);

    if (!auth) {
      // Mock Register
      await new Promise((resolve) => setTimeout(resolve, 600));
      const users = JSON.parse(localStorage.getItem("luxespace_mock_users") || "[]");
      
      if (users.some((u) => u.email === email)) {
        setLoading(false);
        const err = new Error("This email address is already in use.");
        err.code = "auth/email-already-in-use";
        throw err;
      }

      const newUser = {
        uid: `user-${Date.now()}`,
        email,
        password,
        displayName: displayName || email.split("@")[0]
      };
      
      users.push(newUser);
      localStorage.setItem("luxespace_mock_users", JSON.stringify(users));

      const sessionUser = { uid: newUser.uid, email: newUser.email, displayName: newUser.displayName };
      localStorage.setItem("luxespace_session_user", JSON.stringify(sessionUser));
      setUser(sessionUser);
      setLoading(false);
      return sessionUser;
    }

    // Real Firebase Register
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, {
        displayName: displayName || email.split("@")[0]
      });
      const updatedUser = auth.currentUser;
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);

    if (!auth) {
      // Mock Google Login
      await new Promise((resolve) => setTimeout(resolve, 600));
      const googleUser = {
        uid: "google-mock-user",
        email: "luxe.curator@gmail.com",
        displayName: "Luxe Curator",
        photoURL: ""
      };
      localStorage.setItem("luxespace_session_user", JSON.stringify(googleUser));
      setUser(googleUser);
      setLoading(false);
      return googleUser;
    }

    // Real Firebase Google Login
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      return result.user;
    } catch (error) {
      console.error("Google sign-in error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);

    if (!auth) {
      // Mock Logout
      await new Promise((resolve) => setTimeout(resolve, 300));
      localStorage.removeItem("luxespace_session_user");
      setUser(null);
      setLoading(false);
      return;
    }

    // Real Firebase Logout
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
