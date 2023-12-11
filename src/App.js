import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { Locator } from "./components/locator/Locator";
import { Calendar } from "./components/calendar/Calendar";
import MedicationTable from "./components/tracker/MedicationTable";
import { LoginPage } from "./components/LoginPage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [authCheckComplete, setAuthCheckComplete] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        firebaseUser.userId = firebaseUser.uid;
        firebaseUser.userName = firebaseUser.displayName;
        setCurrentUser(firebaseUser);
      } else {
        setCurrentUser(null);
      }
      setAuthCheckComplete(true);
    });

    return () => unsubscribe();
  }, []);

  const displayUsername = () => {
    const username = currentUser ? currentUser.userName : "";
    return <NavBar username={username} />;
  };



  const RequireAuth = () => {
    if (!authCheckComplete) {
      return null;
    }
  
    if (currentUser) {
      return (
        <Routes>
          <Route index element={<Navigate to="/locator" />} />
          {/* Use a dedicated route for MedicationTable */}
          <Route path="tracker" element={<MedicationTable />} />
        </Routes>
      );
    } else {
      return <Navigate to="/login" />;
    }
  };

  return (
    <div>
      {displayUsername()}
      <Routes>
        <Route index element={<RequireAuth />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="locator" element={<Locator userId={currentUser?.userId} />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="tracker" element={<MedicationTable />} />
        <Route path="*" element={<RequireAuth />} />
      </Routes>
      <Footer />
    </div>
  );
}
