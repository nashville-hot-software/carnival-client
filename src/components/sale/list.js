import React, { useState, useEffect } from "react";
import SaleCard from "./card";
import DataManager from "../../api/dataManager";
import Modal from 'react-bootstrap/Modal';
import Moment from 'react-moment';
import ModalWrapper from "../modal/modalWrapper"

import "./list.css";

const SaleList = (props) => {
    const [matchedSale, setMatchedSale] = useState();
    const [creationView, setCreationView] = useState(false);
    const [detailsView, setDetailsView] = useState(false);
    const [open, setOpen] = useState(false);
    const [sales, setSales] = useState();
    const [show, setShow] = useState(false);
    // const handleShow = () => setShow(true);
    const handleDropdownClose = () => setOpen(false);

    const showDetailsModal = salesArg => {
        setDetailsView(true);
        const foundSale = sales.filter(matchedSales => matchedSales.id === salesArg.id);
        document.querySelector(".modal-box").classList.add("show");
        document.querySelector(".modal-bg").classList.add("show");
        console.log(foundSale);
        setMatchedSale(foundSale[0]);
    }


    const handleShow = () => {
        setCreationView(true)

        document.querySelector(".modal-box").classList.remove("fade-out");
        document.querySelector(".modal-bg").classList.remove("fade-out");
        document.querySelector(".modal-box").classList.add("show");
        document.querySelector(".modal-bg").classList.add("show");
    };


    const handleSalesSearch = evt => {
        if (evt.target.value.length > 0) {
            DataManager.getAll("sales", "searchTerm", evt.target.value)
                .then(matchedSales => {
                    console.log(matchedSales)
                    setSales(matchedSales);
                });
        } else {
            setSales([])
        }
    }


    useEffect(() => {
    }, [sales]);
    return (
        <>
            <ModalWrapper
                setMatchedSale={setMatchedSale}
                matchedSale={matchedSale}
                setCreationView={setCreationView}
                creationView={creationView}
            />
            {/* SALE SEARCH PAGE */}

            <div className="sales-searchlist--container">
                <div className="sales--subContainer">
                    <div className="sales--header">Sales</div>
                    <input
                        className="sales-searchBar"
                        type="text"
                        onChange={handleSalesSearch}
                        placeholder="Search for Sales"
                    />
                    <div className="searchResults sales">
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
                    <button onClick={() => handleShow()} className="addSale--btn">
                        Add Sale
                    </button>
                </div>
            </div>
        </>
    );
};

export default SaleList;


