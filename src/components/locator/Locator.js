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
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const db = getDatabase();
    let pharmacyArrayRef = ref(db, "users/" + props.userId + "/pharmacyArray");

    useEffect(() => {
        
        // Initialize pharmacy array from database
        const auth = getAuth();
        onAuthStateChanged(auth, (firebaseUser) => {
            if (!firebaseUser) {
                setPharmacyArray([]);
                setSelectedPharmacy({ name: '' });
                pharmacyArrayRef = ref(db, "users/" + null + "/pharmacyArray");

                set(pharmacyArrayRef, {})
                    .then(() => {
                        setAlertType('warning');
                        setAlertMessage('Login in order to save information.');
                        setShowAlert(true);
                    })
                    .catch((error) => {
                        setAlertType('failure');
                        setAlertMessage(error.message);
                        setShowAlert(true);
                    })
            } else {
                pharmacyArrayRef = ref(db, "users/" + firebaseUser.uid + "/pharmacyArray");
                onValue(pharmacyArrayRef, (snapshot) => {
                    const pharmacyArrayValue = snapshot.val();
                    if (pharmacyArrayValue) {
                        setPharmacyArray(pharmacyArrayValue);
                    }
                });
            }
        })
    }, [])

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
        set(pharmacyArrayRef, newPharmacyArray)
            .then(() => {
                setAlertType('success');
                setAlertMessage('Successfully created the pharmacy.')
                setShowAlert(true);
            })
            .catch((error) => {
                setAlertType('failure');
                setAlertMessage(error.message);
                setShowAlert(true);
            })
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
        set(pharmacyArrayRef, newList)
            .then(() => {
                setAlertType('success');
                setAlertMessage('Successfully edited the pharmacy.')
                setShowAlert(true);
            })
            .catch((error) => {
                setAlertType('failure');
                setAlertMessage(error.message);
                setShowAlert(true);
            })
        setPharmacyArray(newList);
        setSelectedPharmacy(newPharmacy);
    }

    const deletePharmacy = (currentPharmacy, pharmacyList) => {
        setPharmacyArray(pharmacyList.filter((pharmacy) => pharmacy !== currentPharmacy));
        set(pharmacyArrayRef, pharmacyList.filter((pharmacy) => pharmacy !== currentPharmacy))
            .then(() => {
                setAlertType('success');
                setAlertMessage('Successfully deleted the pharmacy.')
                setShowAlert(true);
            })
            .catch((error) => {
                setAlertType('failure');
                setAlertMessage(error.message);
                setShowAlert(true);
            })
        setSelectedPharmacy({ name: "" });
    }

    // Displays 3 different alert messages: failure, warning, success
    function displayAlert() {
        if (showAlert) {
            if (alertType === "failure") {
                return (
                    <div className="alert alert-danger text-center" role="alert">
                        {alertMessage}
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowAlert(false)}></button>
                    </div>
                );
            } else if (alertType === "warning") {
                return (
                    <div className="alert alert-warning text-center" role="alert">
                        {alertMessage}
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowAlert(false)}></button>
                    </div>
                );
            } else {
                return (
                    <div className="alert alert-success text-center" role="alert">
                        {alertMessage}
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowAlert(false)}></button>
                    </div>
                );
            }
        }
    }

    return (
        <div className="pharmacy-background">
            <div className="pharmacy-background-overlay">
                <h2 className="text-center">Pharmacy Locator</h2>
                {displayAlert()}
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