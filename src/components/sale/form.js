import React, { useState, useEffect } from "react";
import DataManager from "../../api/dataManager";
import Modal from "react-bootstrap/Modal";

const SaleForm = (props) => {
    
    const [show, setShow] = useState(false);
    const [dealerships, setDealerships] = useState([]);

    const [newSale, setNewSale] = useState(      {
        price: 0.00,
        deposit: 0,
        pickup_date: "",
        invoice_number: "",
        payment_method: "",
        returned: false,
        dealership_id: 0,
        employee_id: 1,
        sales_type_id: 0,
        vehicle_id: 0,
        first_name: "",
        last_name: "",
        email_address: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        company_name: ""
    })
    
    
    
    useEffect(() => { }, []);

    return <>
    
    </>;
};
export default SaleForm;
