import React, { useState } from "react";
import { PharmacyList } from "./PharmacyList";
import { PharmacyMap } from "./PharmacyMap";
import { PharmacyInformation } from "./PharmacyInformation";
import { PharmacyAdd } from "./PharmacyAdd";

export function Locator() {
    const [pharmacyArray, setPharmacyArray] = useState([
    ]);

    // creates a pharmacy
    const createPharmacy = (pharmacyName, pharmacyAddress, pharmacyNumber) => {
        setPharmacyArray([...pharmacyArray,
        {
            name: pharmacyName,
            address: pharmacyAddress,
            phoneNumber: pharmacyNumber,
            id: pharmacyName
        }]);
    }

    console.log(pharmacyArray);
    return (
        <div>
            <h2 className="text-center">Pharmacy Locator</h2>
            {/* First row includes Pharmacy List, Map, Information */}
            <div className="row">
                <PharmacyList list={pharmacyArray} />
                <PharmacyMap />
                <PharmacyInformation />
            </div>
            {/* Second row includes Input function */}
            <div className="row">
                <PharmacyAdd add={createPharmacy} />
            </div>
        </div>
    );
}