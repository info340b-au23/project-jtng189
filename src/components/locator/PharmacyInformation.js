import React from "react";
import { PharmacyNotes } from "./PharmacyNotes";

// TO-DO:
// Adjust "href" to be reactive
// Adjust "value" to be reactive
// Adjust "textbox value" for PharmacyNotes (done in its component)
export function PharmacyInformation() {
    return (
        <div className="pharmacy-data col col-sm col-md col-lg">
            <section className="locator">
                <h3>Data Information: Pharmacy 4</h3>
                <div className="card">
                    <div className="card-body">
                        <div>
                            <a style={{textDecoration: 'none'}}
                                href="https://www.google.com/maps/search/12345+X+12th+Street,+City,+State+56789/@47.6219654,-122.3686268,14z/data=!3m1!4b1?entry=ttu">
                                <i className="material-icons" aria-label="Pharmacy location">home</i>
                            </a>
                            <span className="item-hide">Location: <input type="text" id="location" name="location"
                                    value="12345 X 12th Street, City, State 56789>"></input> </span>
                        </div>
                        <div>
                            <a style={{textDecoration: 'none'}} href="tel:123-456-7890">
                                <i className="material-icons" aria-label="Call Pharmacy Phone Number">call</i>
                            </a>
                            <span className="item-hide">Number (#): <input type="text" id="phoneNum" name="phoneNum"
                                    value="123-456-7890"></input></span>
                        </div>

                        <PharmacyNotes />
                    </div>
                </div>
            </section>
        </div>
    );
}