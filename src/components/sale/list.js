import React, { useState, useEffect } from "react";
import SaleCard from "./card";
import DataManager from "../../api/dataManager";
import Modal from 'react-bootstrap/Modal';
import Moment from 'react-moment';  
import "./list.css";

const SaleList = (props) => {
    // var invNum = require('invoice-number')
    // invNum.next(`${incrementedValue}`) 899ZZZ9
//    let randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    const [sales, setSales] = useState();
    const [show, setShow] = useState(false);
    const [dealerships, setDealerships] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
    const handleSubmit = () => {
        if (newSale.first_name === "" && newSale.last_name === "") {
            window.alert("Please fill out new customer name fields")
        } else if (newSale.email_address === "") {
            window.alert("Please enter customers email address")
        } else if (newSale.company_name === "") {
            window.alert("Please enter customers email address")
        } else if (newSale.phone === "") {
            window.alert("Please enter a valid phone number")
        } else if (newSale.dealership_id === 0) {
            window.alert("Please select a valid dealership")
        } else if (newSale.sales_type_id === 0) {
            window.alert("Please select a valid employee type")
        } else if (newSale.vehicle_id === 0) {
            window.alert("Please select a valid vehicle")
        } else if (newSale.street === 0) {
            window.alert("Please select a valid vehicle")
        } else if (newSale.city === 0) {
            window.alert("Please select a valid vehicle")
        } else if (newSale.state === "") {
            window.alert("Please select a valid vehicle")
        } else if (newSale.zipcode === "") {
            window.alert("Please select a valid vehicle")
        } else if (newSale.price === "") {
            window.alert("Please select a valid vehicle")
        } else if (newSale.price === "") {
            window.alert("Please select a valid vehicle")
        } else if (newSale.invoice_number === "") {
            window.alert("Please select a valid vehicle")
        } else {
            DataManager.PostData("sales", newSale)
                .then(() => setShow(false))
        }
    }

   
    const handleSalesSearch = evt => {
        DataManager.getAll("sales", "searchTerm", evt.target.value)
            .then(matchedSales => {
                console.log(matchedSales)
                setSales(matchedSales);
            });
    }
    const handleDealershipSearch = evt => {
        DataManager.getAll("dealerships", "searchTerm", evt.target.value)
            .then(matchedDealerships => {
                setDealerships(matchedDealerships);
            });
    }
    const handleVehicleSearch = evt => {
        DataManager.getAll("vehicles", "searchTerm", evt.target.value)
            .then(matchedVehicles => {
                setVehicles(matchedVehicles);
            });
    }
    const handleDealerSelect = evt => {
        const stateToChange = { ...newSale }
        stateToChange.dealership_id = evt.target.id
        setNewSale(stateToChange)
    }
    const handleVehicleSelect = evt => {
        const stateToChange = { ...newSale }
        stateToChange.vehicle_id = evt.target.id
        setNewSale(stateToChange)
    }
    const handleInputFieldChange = evt => {
        const stateToChange = { ...newSale }
        stateToChange[evt.target.id] = evt.target.value
        setNewSale(stateToChange)
    }
    const fetchEmployeeTypes = () => {
        DataManager.getAll("employeetypes")
            .then(employeeTypes => {
                setEmployeeTypes(employeeTypes);
            });
    }
    useEffect(() => {
        fetchEmployeeTypes();
    }, [])
    
   


    return (
        <div className="sales-searchlist--container">
            <div className="sales--subContainer">
                <div className="sales--header">Sales</div>
                <input
                    className="sales-searchBar"
                    type="text"
                    onChange={handleSalesSearch}
                    placeholder="Search for Sales"
                />
                {sales !== undefined ? (
                    <div className="searchResults">
                        {sales.map((sale) => {
                            return <SaleCard key={sale.id} sale={sale} {...props} />;
                        })}
                    </div>
                ) : null}

                <div className="btn-hover-zoom">
                    <button className="addSale--btn">
                        Add Sale
                </button>

                    <Modal className="modal--form" show={show} onHide={handleClose}>
                        <Modal.Header className="modalHeader" closeButton>
                            <Modal.Title>New Sale</Modal.Title>
                        </Modal.Header>
                        <div className="modalBody">
                            <Modal.Body className="fieldset">
                                <label className="name--label">First Name:</label>
                                <input onChange={handleInputFieldChange} id="first_name" className="modal--input" type="text" />
                            </Modal.Body>
                            <Modal.Body className="fieldset">
                                <label className="name--label">Last Name:</label>
                                <input onChange={handleInputFieldChange} id="last_name" className="modal--input" type="text" />
                            </Modal.Body>
                            <Modal.Body className="fieldset">
                                <label className="name--label">Email:</label>
                                <input onChange={handleInputFieldChange} id="email_address" className="modal--input" type="text" />
                            </Modal.Body>
                            <Modal.Body className="fieldset">
                                <label className="name--label">Phone:</label>
                                <input onChange={handleInputFieldChange} id="phone" className="modal--input" type="text" />
                            </Modal.Body>
                            {/* TODO: For the dealership, will need a submenu to search dealerships.... */}
                            <Modal.Body className="fieldset">
                                <label className="name--label">Dealership:</label>
                                <input className="modal--input" type="text" onChange={handleDealershipSearch} />
                                {dealerships !== undefined && dealerships.length > 0 ? (
                                    <div className="dealership--dropdown">
                                        {dealerships.map(dealership => {
                                            return (
                                                <>
                                                    <div
                                                        className="dealership--select"
                                                        id={dealership.id}
                                                        onClick={handleDealerSelect}
                                                    >
                                                        {dealership.business_name}
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </div>
                                ) : null}
                            </Modal.Body>

                            {employeeTypes !== undefined ? (
                                <Modal.Body className="fieldset">
                                    <label className="name--label">Employee Type:</label>
                                    <select
                                        id="employee_type_id"
                                        onChange={handleInputFieldChange}
                                    >
                                        {employeeTypes.map(type => {
                                            return (
                                                <option value={type.id}>
                                                    {type.name}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </Modal.Body>
                            ) : null}

                            <Modal.Body>
                                <button onClick={handleSubmit} className="addEmployee--btn">
                                    Submit
                        </button>
                            </Modal.Body>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default SaleList;


