import React, { useState, useEffect } from "react";
import SaleCard from "./card";
import DataManager from "../../api/dataManager";
import ModalWrapper from "../modal/modalWrapper"
import "./list.css";

const SaleList = (props) => {
    const [matchedSale, setMatchedSale] = useState();
    const [creationView, setCreationView] = useState(false);
    const [sales, setSales] = useState();

    // When edit mode is switched off the search list will re-render with searched
    // query to reflect the updates in realtime
    const [editMode, setEditMode] = useState(false);
    const [query, setQuery] = useState();

    const showDetailsModal = salesArg => {
        const foundSale = sales.filter(matchedSales => matchedSales.id === salesArg.id);
        document.querySelector(".modal-box").classList.add("show");
        document.querySelector(".modal-bg").classList.add("show");
        console.log(foundSale);
        setMatchedSale(foundSale[0]);
    }


    const handleShow = () => {
        setCreationView(true);

        document.querySelector(".modal-box").classList.add("show");
        document.querySelector(".modal-bg").classList.add("show");
    };


    const handleSalesSearch = evt => {
        if (evt.target.value.length > 0) {
            setQuery(evt.target.value);

            DataManager.getAll("sales", "searchTerm", evt.target.value)
                .then(matchedSales => {
                    console.log(matchedSales)
                    setSales(matchedSales);
                });
        } else {
            setSales([])
        }
    }

    // this reflects the sale update in the search list realtime by re-searching for the
    // sale when edit mode switched off
    useEffect(() => {
        DataManager.getAll("sales", "searchTerm", query).then(
            (matchedSales) => {
                setSales(matchedSales);
            }
        );
    }, [editMode])

    return (
        <>
            <ModalWrapper
                setMatchedSale={setMatchedSale}
                matchedSale={matchedSale}
                setCreationView={setCreationView}
                saleCreationView={creationView}
                editMode={editMode}
                setEditMode={setEditMode}
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


