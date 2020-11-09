import React, { useState, useEffect } from "react";
import SaleManager from "../../api/dataManager";
import "./card.css"

const SaleCard = props => {

    const [sale, setSale] = useState(props.sale);


    return (
        <>
            <div className="sale-card--container">
                <h2 className="sale-card--name">{`${sale.first_name} ${sale.last_name}`}</h2>
            </div>
        </>
    );
};

export default SaleCard;