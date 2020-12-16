import React from "react"
import SaleCard from "./card";
import { modal } from "../../modules/modal/helpers"

const SearchList = props => {
    return (
        <div className="sales-searchlist--container">
            <div className="sales--subContainer">
                <div className="sales--header">Sales</div>
                <input
                    className="sales-searchBar"
                    type="text"
                    onChange={props.handleSalesSearch}
                    placeholder="Search for Sales"
                />
                <div className="searchResults sales">
                    {props.sales !== undefined ? (
                        <>
                            {props.sales.map((sale) => {
                                return <SaleCard key={sale.id}
                                    sale={sale}
                                    {...props}
                                    showDetailsModal={props.showDetailsModal}
                                />;
                            })}
                        </>
                    ) : null}
                </div>
                <button onClick={() => modal.handleShow(props.setCreationView)} className="addSale--btn">
                    Add Sale
                </button>
            </div>
        </div>
    )
}

export default SearchList;