import React, { useState, useEffect } from "react";
import DealershipManager from "../../api/dataManager";
import "./card.css"

import Modal from 'react-bootstrap/Modal';

const DealershipCard = props => {

  const [dealership, setDealership] = useState(props.dealership);

  return (
    <>
        <div className="dealership-card--container">
            <h2 className="dealership-card--name">{`${dealership.business_name}`}</h2>
        </div>
    </>
  );
};

export default DealershipCard;
