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
    
    // Sets the initial values of useStates to selected pharmacy
    useEffect(() => {
        setAddress(pharmacy.address || ''); 
        setPhoneNumber(pharmacy.phoneNumber || '');
    }, [pharmacy]);

    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const addressChange = (event) => {
        setAddress(event.target.value);
    }
    const phoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    }

    // Test Code

    // console.log(pharmacy);
    // console.log("State Variables: " + address + " " + phoneNumber);
    // console.log("Pharmacy Variables: " + pharmacy.address + " " + pharmacy.phoneNumber);
    
    return (
        <div className="pharmacy-data col col-sm col-md col-lg">
            <section className="locator">
                <h3>{"Data Information: " + pharmacy.name}</h3>
                <div className="card">
                    <div className="card-body">
                        <div>
                            <a style={{ textDecoration: 'none' }}
                                href="https://www.google.com/maps/search/12345+X+12th+Street,+City,+State+56789/@47.6219654,-122.3686268,14z/data=!3m1!4b1?entry=ttu">
                                <i className="material-icons" aria-label="Pharmacy location"><HomeIcon /></i>
                            </a>
                            <span className="item-hide">Location: <input type="text" id="location" name="location" onChange={addressChange} value={address}
                            ></input> </span>
                        </div>
                        <div>
                            <a style={{ textDecoration: 'none' }} href="tel:123-456-7890">
                                <i className="material-icons" aria-label="Call Pharmacy Phone Number"><CallIcon /></i>
                            </a>
                            <span className="item-hide">Number (#): <input type="text" id="phoneNum" name="phoneNum" onChange={phoneNumberChange} value={phoneNumber}
                            ></input></span>
                        </div>

                        <PharmacyNotes pharmacy={pharmacy} />
                    </div>
                </div>
            </section>
        </div>
    );
}
