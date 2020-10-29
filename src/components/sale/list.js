
import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom"
import SaleManager from "../../api/dataManager.js"
import SaleCard from "./card.js"
import './sale.css'

const Sales = props => {


    const [sales, setSales] = useState([]);

    const getSales = () => {
        // if((isAuthenticated())){
        // }
        SaleManager.getAll("sales",20).then((response) => {
            setSales(response);
            console.log(response)
        });
    };


    useEffect(() => {
        getSales();
    }, []);

    return (
        <>
            <div className="salesContainer">
                {sales.slice(0, 20).map((item, id) => (
                    <SaleCard key={id} item={item} getSales={getSales}{...props} />
                ))}
            </div>
        </>
    )
}
export default Sales;
