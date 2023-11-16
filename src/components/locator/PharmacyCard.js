import React, { useState } from "react";

// TO-DO:
// Make "id", "name", "for", and label name respective
// set "checked" interaction
export function PharmacyCard(props) {
    // const [checkRadio, setCheckRadio] = useState(false);

    const pharmacyName = props.name;
    const pharmacyAddress = props.address;
    const cardKey = pharmacyName+pharmacyAddress;

    function onClickRadio(event) {
        event.preventDefault();

        props.selectPharmacy(pharmacyName, pharmacyAddress);
        // setCheckRadio(!checkRadio);
    }
    
    return (
        <div className="card" id={cardKey + cardKey.length}>
            <div className="card-body">
                <input type="radio" id="pharmacyRadio" name="pharmacyRadio" onClick={onClickRadio}></input>
                <label htmlFor="pharmacyRadio">{pharmacyName}</label>
                <br></br>
                <span>{pharmacyAddress}</span>
            </div>
        </div>
    );
}