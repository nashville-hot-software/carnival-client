import React, { useState, useEffect } from "react";
import SaleCard from "./card";
import DataManager from "../../api/dataManager";
import USAStatesArray from "./stateList";
import Modal from 'react-bootstrap/Modal';
import Moment from 'react-moment';  
import "./list.css";

const SaleList = (props) => {
    const [filteredEmployee, setFilteredEmployee] = useState();
    const [creationView, setCreationView] = useState(false);
    const [sales, setSales] = useState();
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    
    const foundSale = sales.filter(matchedSales => matchedSales.id === SalesArg.id);

    
    const handleSalesSearch = evt => {
        DataManager.getAll("sales", "searchTerm", evt.target.value)
            .then(matchedSales => {
                console.log(matchedSales)
                setSales(matchedSales);
            });
    }  
    



    return (
<>
        <ModalWrapper 
                filteredEmployee={filteredEmployee} 
                setCreationView={setCreationView}
                creationView={creationView}
            />
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
                            return <SaleCard key={sale.id} 
                            sale={sale} 
                            {...props} 
                            handleDropdownClose={handleDropdownClose}
                            showDetailsModal={showDetailsModal}
                            />;
                        })}
                    </>
                ) : null}
                </div>
                <div className="btn-hover-zoom">
                    <button onClick={() => handleShow()} className="addSale--btn">
                        Add Sale
                    </button>
                </div>
            </div>
        </div>
        </>
    );
};

export default SaleList;


