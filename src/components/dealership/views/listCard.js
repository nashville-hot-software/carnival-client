import React from "react";
import "../../../styles/dealerships/card.css"

const DealershipCard = props => {

  return (
    <>
        <div onClick={() => props.showDetailsModal(props.dealership)} className="dealership-card--container">
            <h2 className="dealership-card--name">{`${props.dealership.business_name}`}</h2>
        </div>
    </>
  );
};

export default DealershipCard;
