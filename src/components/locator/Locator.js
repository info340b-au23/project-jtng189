import React, { useState } from "react";
import { PharmacyList } from "./PharmacyList";
import { PharmacyMap } from "./PharmacyMap";
import { PharmacyInformation } from "./PharmacyInformation";
import { PharmacyAdd } from "./PharmacyAdd";

export function Locator() {
    const [pharmacyArray, setPharmacyArray] = useState([]);
    const [selectedPharmacy, setSelectedPharmacy] = useState({name : ""});

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

    const editPharmacy = (newPharmacy, pharmacyList) => {
        const newList = pharmacyList.map((pharmacy) => {
            if (pharmacy.name === newPharmacy.name) {
                pharmacy = newPharmacy;
            }
            return pharmacy;
        });
        setPharmacyArray(newList);

        setSelectedPharmacy(newPharmacy);
    }

    const deletePharmacy = (currentPharmacy, pharmacyList) => {
        setPharmacyArray(pharmacyList.filter((pharmacy) => pharmacy !== currentPharmacy));
        setSelectedPharmacy({name: ""})
    }

    return (
        <div>
            <h2 className="text-center">Pharmacy Locator</h2>
            <div className="row">
                <PharmacyList list={pharmacyArray} selectedPharmacy={selectedPharmacy} selectPharmacy={selectPharmacy} />
                <PharmacyMap pharmacy={selectedPharmacy} />
                <PharmacyInformation list={pharmacyArray} pharmacy={selectedPharmacy} edit={editPharmacy} delete={deletePharmacy} />
            </div>
            <div className="row">
                <PharmacyAdd add={createPharmacy} list={pharmacyArray} />
            </div>
        </div>
    );
}