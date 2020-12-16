import React from "react"
import { modal } from "../../../modules/modal/helpers"
import DealershipCard from "./listCard";

const SearchList = props => {
    return (
        <div className="dealerships--container">
            <div className="dealerships--subContainer">
                <div className="dealership--header">Dealerships</div>

                <input 
                    type='text' 
                    className="dealerships-searchBar" 
                    onChange={props.handleDealershipSearch} 
                    placeholder="Search for Dealerships" 
                />
                
                {props.dealerships !== undefined ? (
                    <div className="searchResults dealerships">
                    {props.dealerships.map(dealership => {
                        return (
                        <DealershipCard
                            key={dealership.id}
                            dealership={dealership}
                            showDetailsModal={props.showDetailsModal}
                            {...props}
                        />
                        );
                    })}
                    </div>
                ) : null}

                <button onClick={() => modal.handleShow(props.setCreationView)} className="addDealership--btn">
                    Add New Dealership
                </button>
            </div>
        </div>
    )
}

export default SearchList;