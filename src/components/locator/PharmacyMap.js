import React, { useState, useEffect } from "react";

// TO-DO:
// make "h3" pharmacy title respective
// change "src" link
// Add Google Maps API support
// Adjust map sizing/positioning

export function PharmacyMap(props) {
    // const apiKey = useJsApiLoader({
    //     googleMapsApiKey: AIzaSyBldM_80zD9zC5x7Bm7RBybvxtpFl3XYO0
    // });
    const [name, setName] = useState("");

    useEffect(() => {
        console.log(props.pharmacy);
        setName(props.pharmacy.name || "");
    }, [props.pharmacy]);
    
    return (
        <div className="col col-sm col-md col-lg-5">
            <section className="locator">
                <h3>{"Map Information: " + name}</h3>
                <div className="card map mx-auto">
                    {/* <img className="map" src="Project-Draft/img/map-after.png" alt="google maps location"></img> */}
                    
                </div>
            </section>
        </div>
    );
}