import React, { useState, useEffect } from "react";
import SaleManager from "../../api/dataManager";
import "./card.css"
import Modal from 'react-bootstrap/Modal';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const SaleCard = props => {

    const [sale, setSale] = useState({
        "price": props.sale.price.price,
        "deposit": props.sale.deposit,
        "pickup_date":  props.sale.pickup_date,
        "invoice_number":  props.sale.invoice_number,
        "payment_method":  props.sale.payment_method,
        "returned":  props.sale.returned,
        "dealership_id":  props.sale.dealership_id,
        "employee_id":  props.sale.employee_id,
        "sales_type_id": props.sale.sales_type_id,
        "vehicle_id": props.sale.vehicle_id,
        "first_name":  props.sale.first_name,
        "last_name":  props.sale.last_name,
        "email":  props.sale.email,
        "phone":  props.sale.phone,
        "street":  props.sale.street,
        "city":  props.sale.city,
        "state":  props.sale.state,
        "zipcode":  props.sale.zipcode,
        "company_name":  props.sale.company_name
    });
    const [employee, setEmployee] = useState(props.employee);
    const [dealerships, setDealerships] = useState([]);
    const [employeeTypes, setEmployeeTypes] = useState([]);
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleEditMode = () => {
        fetchEmployeeTypes();
        setEditMode(!editMode)
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