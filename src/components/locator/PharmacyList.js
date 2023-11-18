import React, { useState } from "react";
import ListIcon from '@mui/icons-material/List';
import SearchIcon from '@mui/icons-material/Search';
import { PharmacyCard } from "./PharmacyCard";

// TO-DO
// Take user input of "search", "name" OR "address" filters
// Show only matching pharmacies in the list
export function PharmacyList(props) {
    // checkRadioButton
    const pharmacyArray = props.list;

    const pharmacyCardArray = pharmacyArray.map((pharmacy) => {
        return (
            <PharmacyCard
                pharmacy={pharmacy}
                selectPharmacy={props.selectPharmacy}
                key={pharmacy.key}
                checked={props.selectedPharmacy.name === pharmacy.name}
            />
        );
    });

    return (
        <div className="pharmacy-list col col-sm col-md col-lg">
            <section className="locator">
                <h3><i className="material-icons" aria-label="Pharmacy List"><ListIcon /></i>Pharmacy List</h3>
                <i className="material-icons"><SearchIcon /></i>
                <input id="search-pharmacy" type="text" placeholder="Search.."></input><br></br>
                <input type="radio" id="name-filter" name="filter"></input>
                <label className="filter-spacing" htmlFor="name-filter">Name</label>
                <input type="radio" id="address-filter" name="filter"></input>
                <label className="filter-spacing" htmlFor="address-filter">Address</label>
                {/* Replace below card with component */}
                {/* This should render an array of all the corresponding pharmacies */}
                {pharmacyCardArray}
            </section>
        </div>
    );
}