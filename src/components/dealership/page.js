import React, { useState, useEffect } from "react";
import DealershipManager from "../../api/dataManager";
import DealershipDetails from "./detail";
import Modal from 'react-bootstrap/Modal';
// import "./card.css"


const DealershipPage = props => {

  const [dealership, setDealership] = useState(props.dealership);

  return (
    <>
        <div className="dealership-info--container">
            <DealershipDetails {...props} />
            <h2>Info Here</h2>
        </div>
        <div className="dealership-list--container">
            <h2>List Here</h2>
        </div>
    </>
  );
};

export default DealershipPage;
