import React, { useState } from "react";
import DataManager from "../../api/dataManager";
import VehicleDropdown from "./vehicleDropdown"

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
                console.log(matchedVehicles)
                setVehicles(matchedVehicles);
            }
        );
    };
    //

    return (
        <>
            <label style={{marginTop: "20px"}} className="name--label">Select Vehicle:</label>
            <input
                className="modal--input"
                type="text"
                onChange={handleVehicleSearch}
                value={props.selectedVehicle.vehicleName ? props.selectedVehicle.vehicleName : "" }
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
                {...props} />
                ): null}

        </>
    )
}
export default VehicleSearch;