import React from "react";
import "./card.css"

const SaleCard = (props) => {

    return (
        <>
            <div onClick={() => props.showDetailsModal(props.sale)} className="sale-card--container">
                <h2 className="sale-card--name">{`${props.sale.first_name} ${props.sale.last_name}`}</h2>
            </div>
        </>
    );
};

export default SaleCard;