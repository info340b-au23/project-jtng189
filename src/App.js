import React from "react";

import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { Locator } from "./components/locator/Locator";
import { Calendar } from "./components/calendar/Calendar";

export default function App() {
    return (
        <div>
            <NavBar />
            <Calendar />
            <Footer />
        </div>
    );
}