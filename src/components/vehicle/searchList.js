import React from "react"
import VehicleCard from "./vehicleCard"
import { modal } from "../../modules/modal/helpers"

const SearchList = props => {
    return (
        <div className="vehicles--container">
            <div className="vehicles--subContainer">
                <div className="vehicles--header">Vehicles</div>

                <input 
                    type='text' 
                    className="vehicles-searchBar" 
                    onChange={props.handleVehicleSearch} 
                    placeholder="Search for Vehicles" 
                />
                
                {props.vehicles !== undefined ? (
                    <div className="searchResults vehicles">
                    {props.vehicles.map(vehicle => {
                        return (
                        <VehicleCard
                            key={vehicle.id}
                            vehicle={vehicle}
                            showDetailsModal={props.showDetailsModal}
                            {...props}
                        />
                        );
                    })}
                    </div>
                ) : null}

                <button onClick={() => modal.handleShow(props.setCreationView)} className="addDealership--btn">
                    Add New Vehicle
                </button>
            </div>
        </div>
    );
}

export default SearchList;