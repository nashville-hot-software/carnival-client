import React, { useState, useEffect } from "react";
import DataManager from "../../api/dataManager";
import VehicleDropdown from "./vehicleDropdown"

const VehicleSearch = (props) => {

    const [vehicles, setVehicles] = useState([]);
    const [showVehicles, setShowVehicles] = useState(false);
    const [query, setQuery] = useState("");
    //
    const handleCloseVehicleSearch = () => {
        console.log("hello");
        setShowVehicles(false);
    };
    //
    const handleVehicleSearch = (evt) => {
        if (evt.target.value.length > 0) {
            setQuery(evt.target.value);
            setShowVehicles(true);
            DataManager.getAll("vehicles", "vehicle", evt.target.value).then(
                (matchedVehicles) => {
                    console.log(matchedVehicles)
                    setVehicles(matchedVehicles);
                }
            );
        } else {
            setQuery("");
            setVehicles([]);
        }
    };

    // if (props.postedSale !== undefined) {
    //     setQuery("");
    // }
    //

    useEffect(() => {
        props.setSelectedVehicle("");
        // setQuery("");

        document.querySelector(".vehicle--search").value = "";

    }, [props.postedSale])

    return (
        <>
            <label style={{marginTop: "20px"}} className="name--label">Select Vehicle:</label>
            <input
                className="modal--input vehicle--search"
                type="text"
                onChange={handleVehicleSearch}
                value={props.selectedVehicle.vehicleName ? props.selectedVehicle.vehicleName : query }
                placeholder="Search Vehicles"
            />
            {showVehicles ? (
                <VehicleDropdown
                vehicles={vehicles}
                handleCloseVehicleSearch={handleCloseVehicleSearch}
                showVehicles={showVehicles}
                setShowVehicles={setShowVehicles}
                state={props.newSale}
                setSelectedVehicle={props.setSelectedVehicle}
                setState={props.setNewSale}
                setQuery={setQuery}
                {...props} />
                ): null}

        </>
    )
}
export default VehicleSearch;