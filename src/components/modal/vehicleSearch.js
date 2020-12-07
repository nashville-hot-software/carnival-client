import React, { useState, useEffect } from "react";
import DataManager from "../../api/dataManager";
import "./vehicleDropdown.css";

const VehicleDropdown = (props) => {

    const [vehicles, setVehicles] = useState([]);
    const [showVehicles, setShowVehicles] = useState(false);
    const [query, setQuery] = useState("");
    
    const handleCloseVehicleSearch = () => {
        setShowVehicles(false);
    };
    
    const handleVehicleSearch = (evt) => {
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
        setQuery("");

        const stateToChange = props.state
        stateToChange.vehicle_id = parseInt(evt.target.id);
        stateToChange.price = parseFloat(evt.target.title);

        console.log(evt.target.innerHTML.split("<")[0]);

        props.setSelectedVehicle(
            {
                price: parseFloat(evt.target.title),
                vehicleName: evt.target.innerHTML.split("<")[0]
            })

        document.querySelector(".vehicles--dropdown").scrollTop = 0;
    };

    useEffect(() => {
        props.setSelectedVehicle("");

        document.querySelector(".vehicle--search").value = "";

    }, [props.postedSale])

    return (
        <>
            <label className="vehicle--label">Select Vehicle:</label>
            
            <div 
                className={`vehicles--dropdown ${showVehicles ? "open" : ""}`}
                onBlur={handleCloseVehicleSearch}
            >
                <input
                    className="vehicle--search"
                    type="text"
                    onChange={handleVehicleSearch}
                    value={props.selectedVehicle.vehicleName ? props.selectedVehicle.vehicleName : query }
                    placeholder="Search Vehicles"
                />

                {vehicles.length > 0 ? (
                    <div className="vehicles-results--container">
                        {vehicles.map((vehicle) => {
                            return (
                                <>
                                    <div
                                        className="vehicles--select"
                                        id={vehicle.id}
                                        title={vehicle.floor_price}
                                        onClick={handleVehicleSelect}
                                    >
                                        {`${vehicle.make} ${vehicle.model}`}
                                        <span
                                            className="vin"
                                            id={vehicle.id}
                                            title={vehicle.floor_price}
                                            style={{pointerEvents: "none"}}
                                        >
                                            #{vehicle.vin}
                                        </span>
                                    </div>
                                </>
                            );
                        })}
                    </div>
                ) : null}
            </div>

        </>
    )
}
export default VehicleDropdown;