import React, { useState, useEffect } from "react";
import DataManager from "../../api/dataManager";
import ModalWrapper from "../modal/modalWrapper"
import "../../styles/sales/list.css"
import { modal } from "../../modules/modal/helpers"
import SearchList from "./searchList"

const SaleList = (props) => {
    const [matchedSale, setMatchedSale] = useState();
    const [creationView, setCreationView] = useState(false);
    const [sales, setSales] = useState();

    // When edit mode is switched off the search list will re-render with searched
    // query to reflect the updates in realtime
    const [editMode, setEditMode] = useState(false);
    const [query, setQuery] = useState();

    const showDetailsModal = salesArg => {
        modal.handleDetailsShow();

        const foundSale = sales.filter(matchedSales => matchedSales.id === salesArg.id);
        setMatchedSale(foundSale[0]);
    }

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

            <SearchList 
                handleSalesSearch={handleSalesSearch}
                sales={sales}
                showDetailsModal={showDetailsModal}
                setCreationView={setCreationView}
            />
        </>
    );
};

export default SaleList;


