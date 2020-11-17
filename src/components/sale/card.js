import React, { useState, useEffect } from "react";
import SaleManager from "../../api/dataManager";
import "./card.css"
import Modal from 'react-bootstrap/Modal';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const SaleCard = props => {

  
  
      };
    return (
        <>
            <div onClick={handleShow} className="sale-card--container">
                <h2 className="sale-card--name">{`${sale.first_name} ${sale.last_name}`}</h2>
            </div>
        </>
    );
};

export default SaleCard;