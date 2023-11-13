import React from "react";

import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { Locator } from "./components/locator/Locator";

export default function App() {
    return (
        <div>
            <NavBar />
            <Locator />
            <Footer />
        </div>
    );
}