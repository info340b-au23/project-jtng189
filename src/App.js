import React, { useState} from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { Locator } from "./components/locator/Locator";
import { Calendar } from "./components/calendar/Calendar";
import  MedicationTable from "./components/tracker/MedicationTable";
import { LoginPage } from "./components/LoginPage";
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { useEffect } from "react";

export default function App() {
    
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                firebaseUser.userId = firebaseUser.uid;
                firebaseUser.userName = firebaseUser.displayName;
                setCurrentUser(firebaseUser);
            } else {
                setCurrentUser(null);
            }
        })
    }, []);

    function displayUsername() {
        if (currentUser) {
            return (<NavBar username={currentUser.userName} />);
        } else {
            return(<NavBar username='' />);
        }
    }

    function RequireAuth() {
        if (currentUser) {
            return <Locator userId={currentUser ? currentUser.userId : null}/>;
        } else {
            return <Navigate to="/login" />;
        }
    }
 
    return (
        <div>
            {displayUsername()}
            <Routes>
                <Route index element={<RequireAuth />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="locator" element={<Locator userId={currentUser ? currentUser.userId : null}/>} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="tracker" element={<MedicationTable />} />
            </Routes>
            <Footer />
        </div>
    );
}