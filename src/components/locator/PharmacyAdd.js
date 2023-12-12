import React, { useState, useEffect } from "react";

export function PharmacyAdd(props) {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [nameError, setNameError] = useState("");
    const [addressError, setAddressError] = useState("");

    const getName = (event) => {
        setName(event.target.value);
    }

    const getAddress = (event) => {
        setAddress(event.target.value);
    }

    const getPhoneNumber = (event) => {
        setPhoneNumber(event.target.value);
    }

    useEffect(() => {
        // Check if the name is unique
        if (name === "") {
            setNameError("Please enter a name.");
        } else if (props.list.some((pharmacy) => pharmacy.name === name)) {
            setNameError("Pharmacy with this name already exists.")
        } else {
            setNameError("");
        }

        // Check if the address is empty
        if (address === "") {
            setAddressError("Please enter an address.");
        } else {
            setAddressError("");
        }
    }, [name, address, props.list]);


    function onClickButton(event) {
        event.preventDefault();

        if (nameError === "" && addressError === "") {
            
            props.add(name, address, phoneNumber);
            
            setName("");
            setAddress("");
            setPhoneNumber("");
        }
    }

    return (
        <div className="pharmacy-add col col-sm-12 col-md-8 col-lg-6 mx-auto">
            <section className="locator">
                <h3>Add Pharmacy</h3>
                <div className="card">
                    <div className="card-body">
                        <form>
                            <label className="addForm" htmlFor="pharName">Name:</label><br />
                            <span className="formError">{nameError}</span><br />
                            <input type="text" id="pharName" name="pharName" placeholder="Pharmacy X" value={name} onChange={getName}></input><br />
                            <label className="addForm" htmlFor="pharAddress">Address:</label><br />
                            <span className="formError">{addressError}</span><br />
                            <input type="text" id="pharAddress" name="pharAddress" placeholder="12345 X 12th Street" value={address} onChange={getAddress}></input><br />
                            <label htmlFor="pharPhoneNum">Phone Number:</label><br />
                            <input type="text" id="pharPhoneNum" name="pharPhoneNum" placeholder="123-456-7890" value={phoneNumber} onChange={getPhoneNumber}></input><br />
                            <button type="submit" id="pharAdd" aria-label="Add Pharmacy" onClick={onClickButton}>Add</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
