import React from "react";
import { PharmacyCard } from "./PharmacyCard";

// TO-DO
// Take user input of "search", "name" OR "address" filters
// Show only matching pharmacies in the list
export function PharmacyList() {
    return (
        <div className="pharmacy-list col col-sm col-md col-lg">
            <section className="locator">
                <h3><i className="material-icons" aria-label="Pharmacy List">list</i>Pharmacy List</h3>
                <i className="material-icons">search</i>
                <input id="search-pharmacy" type="text" placeholder="Search.." value="pharmacy 4"></input><br></br>
                <input type="radio" id="name-filter" name="filter" checked></input>
                <label className="filter-spacing" for="name-filter">Name</label>
                <input type="radio" id="address-filter" name="filter"></input>
                <label className="filter-spacing" for="address-filter">Address</label>
                {/* Replace below card with component */}
                {/* This should render an array of all the corresponding pharmacies */}
                <PharmacyCard />
            </section>
        </div>
    );
}