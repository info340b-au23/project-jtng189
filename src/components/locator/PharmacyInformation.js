import React, { useState, useEffect } from "react";
import HomeIcon from '@mui/icons-material/Home';
import CallIcon from '@mui/icons-material/Call';
import { PharmacyNotes } from "./PharmacyNotes";

// TO-DO:
// Adjust "href" to be reactive
// Adjust "value" to be reactive
// Adjust "textbox value" for PharmacyNotes (done in its component)
export function PharmacyInformation(props) {
    const pharmacy = props.pharmacy;

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    // Sets the initial values of useStates to selected pharmacy
    useEffect(() => {
        setAddress(pharmacy.address || ''); 
        setPhoneNumber(pharmacy.phoneNumber || '');
        setName(pharmacy.name || '');
    }, [pharmacy]);

    const addressChange = (event) => {
        setAddress(event.target.value);
    }
    const phoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    }

    const newPharmacy = {...pharmacy,
        name: name,
        address: address,
        phoneNumber: phoneNumber
    }

    const deleteInformation = (pharmacy, pharmacyList) => {
        props.delete(pharmacy, pharmacyList);
        setName('');
        setAddress('');
        setPhoneNumber('');
    };

    // Test Code

    // console.log("This is the pharmacy spotted in PharmacyInformation:" +pharmacy);
    // console.log(newPharmacy);
    // console.log(name);
    // console.log("State Variables: " + address + " " + phoneNumber);
    // console.log("Pharmacy Variables: " + pharmacy.address + " " + pharmacy.phoneNumber);

    return (
        <div className="pharmacy-data col col-sm col-md col-lg">
            <section className="locator">
                <h3>{"Data Information: " + name}</h3>
                <div className="card">
                    <div className="card-body">
                        <div>
                            <a style={{ textDecoration: 'none' }}
                                href={"https://maps.google.com/?q=" + address}>
                                <i className="material-icons" aria-label="Pharmacy location"><HomeIcon /></i>
                            </a>
                            <span >Location: <input type="text" id="location" name="location" onChange={addressChange} value={address}
                            ></input> </span>
                        </div>
                        <div>
                            <a style={{ textDecoration: 'none' }} href={"tel:" + phoneNumber}>
                                <i className="material-icons" aria-label="Call Pharmacy Phone Number"><CallIcon /></i>
                            </a>
                            <span >Number (#): <input type="text" id="phoneNum" name="phoneNum" onChange={phoneNumberChange} value={phoneNumber}
                            ></input></span>
                        </div>

                        <PharmacyNotes pharmacy={pharmacy} newPharmacy={newPharmacy} edit={props.edit} delete={deleteInformation} list={props.list} />
                    </div>
                </div>
            </section>
        </div>
    );
}
