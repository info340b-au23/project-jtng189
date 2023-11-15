import React from "react";
import { PharmacyAdd } from "./PharmacyAdd";

// TO-DO:
// Make "id", "name", "for", and label name respective
export function PharmacyCard() {
    return (
        <div className="card">
            <div className="card-body">
                <input type="radio" id="pharmacyRadio" name="pharmacyRadio"></input>
                <label htmlFor="pharmacyRadio">Pharmacy 4</label>
            </div>
        </div>
    );
}