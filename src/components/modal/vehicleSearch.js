import React, { useState, useEffect } from "react";
import DataManager from "../../api/dataManager";
import "./vehicleDropdown.css";
import NumberFormat from "react-number-format";

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
        setQuery("");

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

        document.querySelector(".vehicles--dropdown").scrollTop = 0;
    };

    // resets dropdown input value after new sale POST
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
                                        <div className="vehicle--title">
                                            {`${vehicle.make} ${vehicle.model}`}
                                        </div>
                                        <div className="vehicle--price">
                                            <NumberFormat
                                                value={vehicle.floor_price}
                                                displayType={"text"}
                                                thousandSeparator={true}
                                                prefix={"$"}
                                            />
                                        </div>
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