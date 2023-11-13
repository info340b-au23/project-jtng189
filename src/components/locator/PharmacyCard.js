import React from "react";

// TO-DO:
// Make "id", "name", "for", and label name respective
export function PharmacyCard() {
    return (
        <div className="card">
            <div className="card-body">
                <input type="radio" id="pharmacy4" name="pharmacy" checked></input>
                <label for="pharmacy4">Pharmacy 4</label>
            </div>
        </div>
    );
}