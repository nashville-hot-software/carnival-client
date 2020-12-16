import React, { useState, useEffect } from "react";
import DataManager from "../../api/dataManager";
import "../../styles/modal/vehicleDropdown.css"
import DropdownMenu from "./dropdownMenu"

const VehicleDropdown = (props) => {

    const [vehicles, setVehicles] = useState([]);
    const [showVehicles, setShowVehicles] = useState(false);
    const [query, setQuery] = useState("");
    
    const handleCloseVehicleSearch = () => {
        setShowVehicles(false);
    };
    
    const handleVehicleSearch = (evt) => {
        // lets user delete selected vehicle from input field to 
        // search for different vehicle
        props.setSelectedVehicle("");

        if (evt.target.value.length > 0) {
            setQuery(evt.target.value);
            setShowVehicles(true);
            DataManager.getAll("vehicles", "vehicle", evt.target.value)
                .then(matchedVehicles => {
                    setVehicles(matchedVehicles);
                }
            );
        } else {
            setQuery("");
            setVehicles([]);
            setShowVehicles(false);
        }
    };

    const handleVehicleSelect = (evt) => {
        const stateToChange = props.state
        stateToChange.vehicle_id = parseInt(evt.target.id);
        stateToChange.price = parseFloat(evt.target.title);

        // getting vehicle name from child element's innerHTML
        const splitOne = evt.target.innerHTML.split("<");
        const vehicleName = splitOne[1].split(">")[1];

        // setting JSX values in form based on selected vehicle
        props.setSelectedVehicle(
            {
                price: parseFloat(evt.target.title),
                vehicleName: vehicleName
            })

        setQuery("");

        document.querySelector(".vehicles--dropdown").scrollTop = 0;

        console.log(document.querySelector(".dealership-list--dropdown"));
    };

    // resets dropdown input value after new sale POST
    useEffect(() => {
        props.setSelectedVehicle("");

        document.querySelector(".dealership--search").value = "";

    }, [props.postedSale])

    return (
        <DropdownMenu 
            label={"Vehicles"}
            handleDropdownClose={handleCloseVehicleSearch}
            open={showVehicles}
            handleSearch={handleVehicleSearch}
            handleSelect={handleVehicleSelect}
            selectedOption={props.selectedVehicle.vehicleName}
            query={query}
            list={vehicles}
            vehicleMode="true"
        />
    )
}
export default VehicleDropdown;