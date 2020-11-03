import React, { useState, useEffect } from "react";
import DealershipManager from "../../api/dataManager";
import Dealerships from "./list";
import DealershipCard from "./card"
import Testing from "./test";
import Modal from 'react-bootstrap/Modal';
import AutoCompleteText from "../autocomplete/AutoComplete";
import "./card.css"


const DealershipPage = props => {

  const [dealership, setDealership] = useState(props.dealership);

  return (
    <>
        <div className="dealership-list--container">
            <AutoCompleteText items = {Dealerships}/>
        </div>
    </>
  );
};

export default DealershipPage;
