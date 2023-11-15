import React, { useState } from "react";

// TO-DO:
// Take user input of "name", "address", and "phone number"
// -> Add warning errors for wrong input (e.g. no name, no address)
// Let button store input into list (List component will render the information)
// Change "placeholder" values
export function PharmacyAdd(props) {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const getName = (event) => {
        setName(event.target.value);
    }
    const getAddress = (event) => {
        setAddress(event.target.value);
    }
    const getPhoneNumber = (event) => {
        setPhoneNumber(event.target.value);
    }

    function onClickButton(event) {
        event.preventDefault();
        // Adds pharmacy
        props.add(name, address, phoneNumber);
        // Resets form input
        setName('');
        setAddress('');
        setPhoneNumber('');
    }

    return (
        <div className="pharmacy-add col col-sm-12 col-md-8 col-lg-6 mx-auto">
            <section className="locator">
                <h3>Add Pharmacy:</h3>
                <form>
                    <label htmlFor="pharName">Name:</label><br></br>
                    <input type="text" id="pharName" name="pharName" placeholder="Pharmacy X" value={name} onChange={getName}></input><br></br>
                    <label htmlFor="pharAddress">Address:</label><br></br>
                    <input type="text" id="pharAddress" name="pharAddress" placeholder="12345 X 12th Street" value={address} onChange={getAddress}></input><br></br>
                    <label htmlFor="pharPhoneNum">Phone Number:</label><br></br>
                    <input type="text" id="pharPhoneNum" name="pharPhoneNum" placeholder="123-456-7890" value={phoneNumber} onChange={getPhoneNumber}></input><br></br>
                    <button type="submit" id="pharAdd" aria-label="Add Pharmacy" onClick={onClickButton}>Add</button>
                </form>
            </section>
        </div>
    );
}