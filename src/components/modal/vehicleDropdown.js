const VehicleDropdown = (props) => {




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
                    <button onClick={props.handleCloseVehicleSearch()}>Close</button>
                    {props.vehicles.map((vehicle) => {
                        return (
                            <>
                                <div
                                    className="vehicles--select"
                                    id={vehicle.id}
                                    title={vehicle.floor_price}
                                    onClick={props.handleVehicleSelect()}
                                >
                                    {`${vehicle.make} ${vehicle.model}`}
                                    <span
                                        className="vin"
                                        id={vehicle.id}
                                        title={vehicle.floor_price}
                                        type="button disabled"
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