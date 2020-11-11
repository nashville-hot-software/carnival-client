import React, { useState, useEffect } from "react";
import SaleCard from "./card";
import SaleManager from "../../api/dataManager";
import "./list.css";

const SaleList = (props) => {
    const [sales, setSales] = useState();

    const handleFieldChange = (evt) => {
        SaleManager.getAll("sales", "searchTerm", evt.target.value).then(
            (matchedSales) => {
                setSales(matchedSales);
            }
        );
    };

    const handleSalesSearch = evt => {
        SaleManager.getAll("sales","searchTerm",evt.target.value)
          .then(matchedSales => {
              console.log(matchedSales)
            setSales(matchedSales);
        });
      }


    
//   const handleInputFieldChange = evt => {
//     const stateToChange = {...newEmployee}
//     stateToChange[evt.target.id] = evt.target.value
//     setNewEmployee(stateToChange)
//   }
    
    return (
        <div className="sales-searchlist--container">
            <div className="sales--subContainer">
                <div className="sales--header">Sales</div>
                <input
                    className="sales-searchBar"
                    type="text"
                    onChange={handleSalesSearch}
                    placeholder="Search for Sales"
                />
                <div className="searchResults">
                {sales !== undefined ? (
                    <>
                        {sales.map((sale) => {
                            return <SaleCard key={sale.id} sale={sale} {...props} />;
                        })}
                    </>
                ) : null}
                </div>

                <button className="addSale--btn">
                    Add Sale
                </button>
            </div>
        </div>
    );
};

export default SaleList;


