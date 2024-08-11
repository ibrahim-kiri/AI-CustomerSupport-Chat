'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';

// Create a Context for authentication
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Set up an observer on the Auth object to get the current user's auth state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Redirect to login page if the user is not authenticated and the path is not public
    if (router.pathname) {
      const publicPaths = ['/login', '/register'];
      console.log('Current Path:', router.pathname);

      if (!loading && !user && !publicPaths.includes(router.pathname)) {
        console.log('Redirecting to /login');
        router.push('/login');
      }
    }
  }, [user, loading, router.pathname]);

  // Function to register a new user with email and password
  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Function to log in a user with email and password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Function to log out the current user
  const logout = () => {
    return signOut(auth);
  };

  // Function to sign in with Google
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      return user;
    } catch (error) {
      console.error('Google sign-in error: ', error);
      throw error;
    }
  };

  // Provide the auth context value to children components
  return (
    <AuthContext.Provider
      value={{ user, register, login, logout, googleSignIn, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
