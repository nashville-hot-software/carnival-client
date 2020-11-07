import React, { useState, useEffect } from "react";
import SaleCard from "./tableCard";
import SaleManager from "../../api/dataManager";
import "./list.css";

const SaleList = (props) => {
    const [sales, setSales] = useState([]);

    const handleFieldChange = (evt) => {
        SaleManager.getAll("sales", "searchTerm", evt.target.value).then(
            (matchedSales) => {
                setSales(matchedSales);
            }
        );
    };
    
    return (
        <div className="sales--container">
            <div className="sales--subContainer">
                <div className="sales--header">Sales</div>
                <input
                    className="sales-searchBar"
                    type="text"
                    onChange={handleFieldChange}
                    placeholder="Search for Sales"
                />
                {sales !== undefined ? (
                    <div className="searchResults">
                        {sales.map((item) => {
                            return <SaleCard key={item.id} item={item} {...props} />;
                        })}
                    </div>
                ) : null}

                {/* <div className="btn-hover-zoom"> */}
                {/* <button className="addEmployee--btn">
                    
                </button> */}
                {/* </div> */}
            </div>
        </div>
    );
};

export default SaleList;


