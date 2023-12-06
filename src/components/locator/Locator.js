import React, { useState, useEffect } from "react";
import { PharmacyList } from "./PharmacyList";
import { PharmacyMap } from "./PharmacyMap";
import { PharmacyInformation } from "./PharmacyInformation";
import { PharmacyAdd } from "./PharmacyAdd";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function Locator(props) {
    const [pharmacyArray, setPharmacyArray] = useState([]);
    const [selectedPharmacy, setSelectedPharmacy] = useState({ name: "" });

    const db = getDatabase();
    const pharmacyArrayRef = ref(db, "users/" + props.userId + "/pharmacyArray");

    useEffect(() => {

        // Initialize pharmacy array from database
        if (props.userId !== null) {
            onValue(pharmacyArrayRef, (snapshot) => {
                const pharmacyArrayValue = snapshot.val();
                if (pharmacyArrayValue) {
                    setPharmacyArray(pharmacyArrayValue);
                }
            });
        } else {
            set(pharmacyArrayRef, {});
        }

        const auth = getAuth();
        onAuthStateChanged(auth, (firebaseUser) => {
            if (!firebaseUser) {
                setPharmacyArray([]);
                setSelectedPharmacy({ name: '' });
            }
        })

    }, [props.userId])

    // creates a unique key
    const pharmacyKey = (pharmacyName) => {
        const pharmacySize = pharmacyArray.length;
        return (pharmacyName + pharmacySize);
    }

    // creates a pharmacy
    const createPharmacy = (pharmacyName, pharmacyAddress, pharmacyNumber) => {
        const newPharmacyArray = ([...pharmacyArray,
        {
            name: pharmacyName,
            address: pharmacyAddress,
            phoneNumber: pharmacyNumber,
            note: "",
            key: pharmacyKey(pharmacyName)
        }]);

        setPharmacyArray(newPharmacyArray);
        set(pharmacyArrayRef, newPharmacyArray);
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
        set(pharmacyArrayRef, newList);
        setPharmacyArray(newList);

        setSelectedPharmacy(newPharmacy);
    }

    const deletePharmacy = (currentPharmacy, pharmacyList) => {
        setPharmacyArray(pharmacyList.filter((pharmacy) => pharmacy !== currentPharmacy));
        set(pharmacyArrayRef, pharmacyList.filter((pharmacy) => pharmacy !== currentPharmacy));
        setSelectedPharmacy({ name: "" });
    }

    return (
        <div className="pharmacy-background">
            <div className="pharmacy-background-overlay">
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
        </div>
    );
}