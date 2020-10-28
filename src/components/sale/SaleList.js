
import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom"
import API from "../../api/dataManager.js"
import SaleCard from "../sale/SaleCard.js"

const SaleList = props => {


    const [sales, setSales] = useState([]);

    const getSales = () => {
        // if((isAuthenticated())){
        // }
        API.getAll("sales").then((response) => {
            setSales(response);
            console.log(response)
        });
    };


    useEffect(() => {
        getSales();
    }, []);

    return (
        <>
            <div >
                <div>
                    <h2>Sale</h2>
                    <div>
                        {sales.slice(0,20).map((item, id) => (
                            <SaleCard key={id} item={item} {...props} />
                        ))}
                    </div>
                </div>
            </div>


        </>
    )
}
export default SaleList;
