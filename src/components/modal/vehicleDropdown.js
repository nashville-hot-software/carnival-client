import react from 'react'
const VehicleDropdown = (props) => {


    const handleVehicleSelect = (evt) => {
        const stateToChange = props.state
        stateToChange.vehicle_id = parseInt(evt.target.id);
        stateToChange.price = parseFloat(evt.target.title);
        console.log(evt.target.innerHTML.split("<")[0]);
        props.setSelectedVehicle(
            {
                price: parseFloat(evt.target.title),
                vehicleName: evt.target.innerHTML.split("<")[0]
            })
        props.setShowVehicles(false)

        console.log(evt.target.title);
        // props.setShowVehicles(false);
    };

    return (
        <>
            {props.showVehicles === true && props.vehicles.length > 0 ? (
                // <div>Select a Vehicle</div>

                // the handle close on blur should close modal but I think this needs
                // to be on a div outside of the ternary..
                <div
                    onBlur={props.handleCloseVehicleSearch}
                    className={`vehicles--dropdown ${props.showVehicles ? "open" : ""}`}
                >
                    <button onClick={() => props.handleCloseVehicleSearch()}>Close</button>
                    {props.vehicles.map((vehicle) => {
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
        </>
    )
}
export default VehicleDropdown;