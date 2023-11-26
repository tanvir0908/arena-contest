import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create user using email and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // Login user using email and password
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // Logout user
  const logoutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  //   Google login
  const googleProvider = new GoogleAuthProvider();
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // User observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // console.log("Observing current user", currentUser);
      setLoading(false);
    });

    return () => unSubscribe();
  }, []);

  const userInfo = {
    user,
    loading,
    createUser,
    loginUser,
    logoutUser,
    googleLogin,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
}
