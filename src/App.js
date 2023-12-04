import React from "react";

import { Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { Locator } from "./components/locator/Locator";
import { Calendar } from "./components/calendar/Calendar";
import  MedicationTable from "./components/tracker/MedicationTable";
import { LoginPage } from "./components/LoginPage";

export default function App() {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route index element={<Locator />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="locator" element={<Locator />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="tracker" element={<MedicationTable />} />
            </Routes>
            <Footer />
        </div>
    );
}