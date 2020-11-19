import React, { useState } from "react";
import DataManager from "../../api/dataManager";
import DataManager from "../../api/dataManager";

const VehicleSearch = (props) => {

    const [vehicles, setVehicles] = useState([]);
    const [showVehicles, setShowVehicles] = useState(false);
    //
    const handleCloseVehicleSearch = () => {
        console.log("hello");
        setShowVehicles(false);
    };
    //
    const handleVehicleSearch = (evt) => {
        setShowVehicles(true);
        DataManager.getAll("vehicles", "vehicle", evt.target.value).then(
            (matchedVehicles) => {
                setVehicles(matchedVehicles);
            }
        );
    };
    //
    const handleVehicleSelect = (evt) => {
        const stateToChange = { ...props.state };
        stateToChange.vehicle_id = parseInt(evt.target.id);
        stateToChange.price = parseFloat(evt.target.title);
        props.setState(stateToChange);
        console.log(stateToChange);
        // console.dir(evt.target)
        console.log(evt.target.title);
        setShowVehicles(false);
    };
    return (
        <>
            <label className="name--label">Select Vehicle:</label>
            <input
                className="modal--input"
                type="text"
                onChange={handleVehicleSearch}
            />

            <VehicleDropdown
                handleVehicleSelect={handleVehicleSelect}
                vehicles={vehicles}
                handleCloseVehicleSearch={handleCloseVehicleSearch}
                {...props} />

        </>
    )
}
export default VehicleSearch;