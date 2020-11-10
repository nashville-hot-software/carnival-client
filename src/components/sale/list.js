import React, { useState, useEffect } from "react";
import SaleCard from "./card";
import SaleManager from "../../api/dataManager";
import "./list.css";

const SaleList = (props) => {
    const [sales, setSales] = useState();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [newSale, setNewSale] = useState({
        city: "",
        last_name: "",
        email_address: "",
        phone: "",
        dealership_id: 0,
        employee_type_id: 0
      })


    

    const handleSalesSearch = evt => {
        SaleManager.getAll("sales","searchTerm",evt.target.value)
          .then(matchedSales => {
              console.log(matchedSales)
            setSales(matchedSales);
        });
      }


    
  const handleInputFieldChange = evt => {
    const stateToChange = {...newSale}
    stateToChange[evt.target.id] = evt.target.value
    setNewSale(stateToChange)
  }
    
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
                {sales !== undefined ? (
                    <div className="searchResults">
                        {sales.map((sale) => {
                            return <SaleCard key={sale.id} sale={sale} {...props} />;
                        })}
                    </div>
                ) : null}

                <div className="btn-hover-zoom">
                <button className="addSale--btn">
                    Add Sale
                </button>
                </div>
            </div>
        </div>
    );
};

export default SaleList;


