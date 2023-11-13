import React from "react";

// TO-DO:
// make "h3" pharmacy title respective
// change "src" link
// Add Google Maps API support
// Adjust map sizing/positioning
export function PharmacyMap() {
    return (
        <div className="col col-sm col-md col-lg-5">
            <section className="locator">
                <h3>Map Information: Pharmacy 4</h3>
                <div className="card map mx-auto">
                    <img className="map" src="Project-Draft/img/map-after.png" alt="google maps location"></img>
                </div>
            </section>
        </div>
    );
}