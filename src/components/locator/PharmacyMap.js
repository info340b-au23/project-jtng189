import React, { useState, useEffect } from "react";
import { APIProvider, Map, useMapsLibrary, Marker } from "@vis.gl/react-google-maps";
import { Loader } from "@googlemaps/js-api-loader";

// Note: Install "@vis.gl/react-google-maps" & @googlemaps/js-api-loader packages

// TO-DO:
// make "h3" pharmacy title respective
// change "src" link
// Add Google Maps API support
// Adjust map sizing/positioning

export function PharmacyMap(props) {
    const [name, setName] = useState("");
    const [location, setLocation] = useState({lat: 47.65485149091028, lng: -122.30749748366422});

    const loader = new Loader({
        apiKey: "AIzaSyBldM_80zD9zC5x7Bm7RBybvxtpFl3XYO0",
        version: "weekly",
        libraries: ["geocoding"]
    })

    // useMapsLibrary stuff

    // const [geocodingService, setGeocodingService] = useState(null);

    // const geocodingLibrary = useMapsLibrary('places');
    // if (!geocodingLibrary) {
    //     console.log('horrendous');
    // }
    
    // // loads the geocoder library
    // useEffect(() => {
    //     if (!geocodingLibrary) {
    //         console.log("bad1");
    //         return ;  
    //     } 
        
    //     setGeocodingService(new geocodingLibrary.GeocodingService());
    // }, [geocodingLibrary]);
    
    // // converts address into {lat, lng}
    // useEffect(() => {
    //     if (!geocodingService) {
    //         console.log("bad2");
    //         return;
    //     }
        
    //     geocodingService.geocode({
    //         address : props.pharmacy.address
    //     }, (response) => {
    //         setLocation({
    //             lat: response.results[0].geometry.location.lat(),
    //             lng: response.results[0].geometry.location.lng()
    //         })
    //     });
    // }, [geocodingService])
    
    useEffect(() => {
        setName(props.pharmacy.name || "");
    }, [props.pharmacy]);
    
    return (
        <div className="col col-sm col-md col-lg-5">
            <section className="locator">
                <h3>{"Map Information: " + name}</h3>
                <div className="card map mx-auto">
                    <APIProvider apiKey={"AIzaSyBldM_80zD9zC5x7Bm7RBybvxtpFl3XYO0"}>
                        {   /* <img className="map" src="Project-Draft/img/map-after.png" alt="google maps location"></img> */}
                        <Map zoom={15} center={location} >
                            <Marker position={location} />
                        </Map>
                    </APIProvider>
                </div>
            </section>
        </div>
    );
}