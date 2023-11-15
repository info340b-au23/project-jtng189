import React from "react";
import { PharmacyAdd } from "./PharmacyAdd";

// TO-DO:
// Make "id", "name", "for", and label name respective
export function PharmacyCard() {
    return (
        <div className="card">
            <div className="card-body">
                <input type="radio" id="pharmacy4" name="pharmacy"></input>
                <label htmlFor="pharmacy4">Pharmacy 4</label>
            </div>
        </div>
    );
}