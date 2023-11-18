import React, { useState } from "react";

// TO-DO:
// Make "id", "name", "for", and label name respective
// set "checked" interaction
export function PharmacyCard(props) {

    const pharmacyName = props.pharmacy.name;
    const pharmacyAddress = props.pharmacy.address;
    const cardKey = pharmacyName+pharmacyAddress;

    function onChangeRadio() {
        props.selectPharmacy(pharmacyName, pharmacyAddress);
    }

    return (
        <div className="card" key={cardKey}>
            <div className="card-body">
                <input type="radio" id="pharmacyRadio" name="pharmacyRadio" onChange={onChangeRadio} checked={props.checked}></input>
                <label htmlFor="pharmacyRadio">{pharmacyName}</label>
                <br></br>
                <span>{pharmacyAddress}</span>
            </div>
        </div>
    );
}