import React from "react";
import { PharmacyList } from "./PharmacyList";
import { PharmacyMap } from "./PharmacyMap";
import { PharmacyInformation } from "./PharmacyInformation";
import { PharmacyAdd } from "./PharmacyAdd";

export function Locator() {
    return(
        <div>
            <h2 className="text-center">Pharmacy Locator</h2>
            {/* First row includes Pharmacy List, Map, Information */}
            <div className="row">
                <PharmacyList />
                <PharmacyMap />
                <PharmacyInformation />
            </div>
            {/* Second row includes Input function */}
            <div className="row">
                <PharmacyAdd />
            </div>
        </div>
    );
}