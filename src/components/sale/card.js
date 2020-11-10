import React, { useState, useEffect } from "react";
import SaleManager from "../../api/dataManager";
import "./card.css"
import Modal from 'react-bootstrap/Modal';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const SaleCard = props => {

    const [sale, setSale] = useState(props.sale);
    const [employee, setEmployee] = useState(props.employee);
    const [dealerships, setDealerships] = useState([]);
    const [employeeTypes, setEmployeeTypes] = useState([]);
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false);


    return (
        <>
            <div className="sale-card--container">
                <h2 className="sale-card--name">{`${sale.first_name} ${sale.last_name}`}</h2>
            </div>
        </>
    );
};

export default SaleCard;