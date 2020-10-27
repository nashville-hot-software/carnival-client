
import React, { useState, useEffect } from "react";
import DashBoard from "../components/dashboard/DashBoard.js"
import { Route, Redirect } from "react-router-dom"
const SaleList = props => {


    const [sales, setSales] = useState([]);

    const getBags = () => {
        // if((isAuthenticated())){

        // }
                 API.getAll("bags").then((response) => {
                    setBags(response);
                });
    };

    useEffect(() => {
        getBags();
    }, []);

    return (
        <>
           <div >
            <div>
                <h2>Your Sale</h2>
                <div>
                    {bags.map(((sale, id) => (
                        <SaleCard  key={id} sale={sale} {...props} />
                    )))}
                </div>
            </div>
        </div>
        
         
        </>
    )
}
export default ApplicationViews;