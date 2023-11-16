import React, { useState } from "react";
import { PharmacyList } from "./PharmacyList";
import { PharmacyMap } from "./PharmacyMap";
import { PharmacyInformation } from "./PharmacyInformation";
import { PharmacyAdd } from "./PharmacyAdd";

export function Locator() {
    const [pharmacyArray, setPharmacyArray] = useState([]);
    const [selectedPharmacy, setSelectedPharmacy] = useState({});

    // creates a unique key
    const pharmacyKey = (pharmacyName) => {
        const pharmacySize = pharmacyArray.length;
        return (pharmacyName + pharmacySize);
    }

    // creates a pharmacy
    const createPharmacy = (pharmacyName, pharmacyAddress, pharmacyNumber) => {
        setPharmacyArray([...pharmacyArray,
        {
            name: pharmacyName,
            address: pharmacyAddress,
            phoneNumber: pharmacyNumber,
            note: "",
            key: pharmacyKey(pharmacyName)
        }]);
    }

    // Finds the selected pharmacy card in the array
    const selectPharmacy = (pharmacyName, pharmacyAddress) => {
        const pharmacy = pharmacyArray.filter((pharmacy) => {
            return (pharmacy.name === pharmacyName && pharmacy.address === pharmacyAddress);
            })
        setSelectedPharmacy(pharmacy.pop());
    }

    console.log(pharmacyArray);
    console.log(selectedPharmacy);
    return (
        <div>
            <h2 className="text-center">Pharmacy Locator</h2>
            {/* First row includes Pharmacy List, Map, Information */}
            <div className="row">
                <PharmacyList list={pharmacyArray} selectPharmacy={selectPharmacy} />
                <PharmacyMap />
                <PharmacyInformation pharmacy={selectedPharmacy} />
            </div>
            {/* Second row includes Input function */}
            <div className="row">
                <PharmacyAdd add={createPharmacy} />
            </div>
        </div>
    );
}