import React, { useState, useEffect } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { Loader } from "@googlemaps/js-api-loader";

// *Import file & assign key when firebase deploying
// NOTE TO GRADER: Use Firebase website to test functionality of map

// import SECRETS from "./secrets.json"
// const API_KEY = SECRETS.API_KEY;

const API_KEY = '';

export function PharmacyMap(props) {
    const [name, setName] = useState("");
    const [location, setLocation] = useState({ lat: 47.65485149091028, lng: -122.30749748366422 });

    
    useEffect(() => {
        const loader = new Loader({
            apiKey: API_KEY,
            version: "weekly",
            libraries: ["geocoding"]
        })
        loader.importLibrary('geocoding').then(() => {
            const geocoder = new window.google.maps.Geocoder();

            geocoder.geocode({ address: props.pharmacy.address }, (results, status) => {
                if (status === 'OK') {
                    setLocation({
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng(),
                    });
                } else {
                    console.log("Geocoding did not return any results.");
                }
            }
            );
        });
    }, [props.pharmacy.address]);

    useEffect(() => {
        setName(props.pharmacy.name || "");
    }, [props.pharmacy]);

    return (
        <div className="col col-sm col-md col-lg-5">
            <section className="locator">
                <h3>{"Map Information: " + name}</h3>
                <div className="card map mx-auto">
                    <APIProvider apiKey={API_KEY}>
                        <Map zoom={15} center={location} >
                            <Marker position={location} />
                        </Map>
                    </APIProvider>
                </div>
            </section>
        </div>
    );
}