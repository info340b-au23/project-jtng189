import React, { useState } from "react";
import ListIcon from '@mui/icons-material/List';
import SearchIcon from '@mui/icons-material/Search';
import { PharmacyCard } from "./PharmacyCard";

export function PharmacyList(props) {
    const pharmacyArray = props.list;
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState(null);

    const searchFilter = (event) => {
        setSearch(event.target.value);
    }

    const onChangeFilter = (event) => {
        setFilter(event.target.value);
    }

    const pharmacyCardArray = pharmacyArray.map((pharmacy) => {
        if (filter === "name" && pharmacy.name.includes(search)) {
            return (
                <PharmacyCard
                    pharmacy={pharmacy}
                    selectPharmacy={props.selectPharmacy}
                    key={pharmacy.key}
                    checked={props.selectedPharmacy.name === pharmacy.name}
                />
            );
        } else if (filter === "address" && pharmacy.address.includes(search)) {
            return (
                <PharmacyCard
                    pharmacy={pharmacy}
                    selectPharmacy={props.selectPharmacy}
                    key={pharmacy.key}
                    checked={props.selectedPharmacy.name === pharmacy.name}
                />
            );
        } else {
            if (!filter && (pharmacy.name.includes(search) || pharmacy.address.includes(search))) {
                return (
                    <PharmacyCard
                        pharmacy={pharmacy}
                        selectPharmacy={props.selectPharmacy}
                        key={pharmacy.key}
                        checked={props.selectedPharmacy.name === pharmacy.name}
                    />
                );
            }
        }
    });

    return (
        <div className="pharmacy-list col col-sm col-md col-lg">
            <section className="locator">
                <h3><i className="material-icons" aria-label="Pharmacy List"><ListIcon /></i>Pharmacy List</h3>
                <input type="radio" id="name-filter" name="filter" value="name" onChange={onChangeFilter} checked={filter === "name"}></input>
                <label className="filter-spacing" htmlFor="name-filter">Name</label>
                <input type="radio" id="address-filter" name="filter" value="address" onChange={onChangeFilter} checked={filter === "address"}></input>
                <label className="filter-spacing" htmlFor="address-filter">Address</label><br />
                <i className="material-icons"><SearchIcon /></i>
                <input id="search-pharmacy" type="text" placeholder="Search.." onChange={searchFilter}></input>
                {pharmacyCardArray}
            </section>
        </div>
    );
}
