import React from "react";

// TO-DO:
// Take user input of "name", "address", and "phone number"
// -> Add warning errors for wrong input (e.g. no name, no address)
// Let button store input into list (List component will render the information)
// Change "placeholder" values
export function PharmacyAdd() {
    return (
        <div className="pharmacy-add col col-sm-12 col-md-8 col-lg-6 mx-auto">
            <section className="locator">
                <h3>Add Pharmacy:</h3>
                <form>
                    <label for="pharName">Name:</label><br></br>
                    <input type="text" id="pharName" name="pharName" placeholder="Pharmacy 4"></input><br></br>
                    <label for="pharAddress">Address:</label><br></br>
                    <input type="text" id="pharAddress" name="pharAddress" placeholder="12345 X 12th Street"></input><br></br>
                    <label for="pharPhoneNum">Phone Number:</label><br></br>
                    <input type="text" id="pharPhoneNum" name="pharPhoneNum" placeholder="123-456-7890"></input><br></br>
                    <button type="submit" id="pharAdd" aria-label="Add Pharmacy">Add</button>
                </form>
            </section>
        </div>
    );
}