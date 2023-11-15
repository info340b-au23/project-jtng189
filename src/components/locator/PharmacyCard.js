import React from "react";

// TO-DO:
// Make "id", "name", "for", and label name respective
export function PharmacyCard(props) {
    return (
        <div className="card">
            <div className="card-body">
                <input type="radio" id="pharmacyRadio" name="pharmacyRadio"></input>
                <label htmlFor="pharmacyRadio">{props.name}</label>
            </div>
        </div>
    );
}