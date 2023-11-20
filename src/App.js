import React from "react";

import { Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { Locator } from "./components/locator/Locator";
import { Calendar } from "./components/calendar/Calendar";

export default function App() {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route index element={<Locator />} />
                <Route path="locator" element={<Locator />} />
                <Route path="calendar" element={<Calendar />} />
                {/* <Route path="tracker" element={<Locator />} /> */}
            </Routes>
            <Footer />
        </div>
    );
}