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
        email: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        company_name: ""
    })
    const [dealerships, setDealerships] = useState([]);
    const [show, setShow] = useState(false);
    const [showVehicles, setShowVehicles] = useState(false);
    const [vehicles, setVehicles] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const handleSubmit = () => {
        if (newSale.first_name === "" && newSale.last_name === "") {
            window.alert("Please fill out new customer name fields")
        } else if (newSale.email === "") {
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
        } else {
            DataManager.PostData("sales", newSale)
                .then(() => {
                    setNewSale({
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
                        email: "",
                        phone: "",
                        street: "",
                        city: "",
                        state: "",
                        zipcode: "",
                        company_name: ""
                    })
                    setShow(false)
                })
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
        setShowVehicles(true);
        DataManager.getAll("vehicles", "vehicle", evt.target.value)
            .then(matchedVehicles => {
                setVehicles(matchedVehicles);
            });
    }

    const handleVehicleSelect = evt => {
        const stateToChange = { ...newSale }
        stateToChange.vehicle_id = evt.target.id
        stateToChange.price = parseFloat(evt.target.title)
        setNewSale(stateToChange)

        console.log(stateToChange)
        // console.dir(evt.target)
        console.log(evt.target.title)

        setShowVehicles(false)
    }

    const handleInputFieldChange = evt => {
        const stateToChange = { ...newSale }
        stateToChange[evt.target.id] = evt.target.value
        setNewSale(stateToChange)
        console.log(stateToChange)
    }

    const handleDealerSelect = evt => {
        const stateToChange = {...newSale}
        stateToChange.dealership_id = evt.target.id
        setNewSale(stateToChange)
        
        // setSelectedDealership(evt.target.innerHTML)

        console.log(stateToChange)
    
        const dropdownDiv = document.querySelector('.dealership--dropdown')
        dropdownDiv.scrollTop = 0;
      }
    
    useEffect(() => {
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
                <div className="searchResults">
                {sales !== undefined ? (
                    <>
                        {sales.map((sale) => {
                            return <SaleCard key={sale.id} sale={sale} {...props} />;
                        })}
                    </>
                ) : null}
                </div>

                <div className="btn-hover-zoom">
                    <button onClick={() => handleShow()} className="addSale--btn">
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
                                <input onChange={handleInputFieldChange} id="email" className="modal--input" type="text" />
                            </Modal.Body>
                            <Modal.Body className="fieldset">
                                <label className="name--label">Phone:</label>
                                <input onChange={handleInputFieldChange} id="phone" className="modal--input" type="text" />
                            </Modal.Body>
                            <Modal.Body className="fieldset">
                                <label className="name--label">Street:</label>
                                <input onChange={handleInputFieldChange} id="street" className="modal--input" type="text" />
                            </Modal.Body>
                            <Modal.Body className="fieldset">
                                <label className="name--label">City:</label>
                                <input onChange={handleInputFieldChange} id="city" className="modal--input" type="text" />
                            </Modal.Body>
                            <Modal.Body className="fieldset">
                                <label className="name--label">State:</label>
                                <input onChange={handleInputFieldChange} id="state" className="modal--input" type="text" />
                            </Modal.Body>
                            
                            <Modal.Body className="fieldset">
                                <label className="name--label">Zipcode:</label>
                                <input onChange={handleInputFieldChange} id="zipcode" className="modal--input" type="text" />
                            </Modal.Body>
                            <Modal.Body className="fieldset">
                                <label className="name--label">Company Name:</label>
                                <input onChange={handleInputFieldChange} id="company_name" className="modal--input" type="text" />
                            </Modal.Body>

                            <label>Sale Types:</label>
                            <select onChange={handleInputFieldChange} id="sales_type_id" className="sale-type--select">
                                <option value="0">Select Type</option>
                                <option value="1">Purchase</option>
                                <option value="2">Lease</option>
                            </select>

                            <label>Deposit:</label>
                            <input 
                                type="text" 
                                placeholder="Deposit" 
                                id="deposit"
                                onChange={handleInputFieldChange} 
                            />
                            
                            <label>Pickup Date:</label>
                            <input 
                                type="date"
                                id="pickup_date" 
                                onChange={handleInputFieldChange} 
                            />

                            <label>Payment Method:</label>
                            <select onChange={handleInputFieldChange} id="payment_method" className="sale-type--select">
                                <option value="">Select Payment Type</option>
                                <option value="mastercard">Mastercard</option>
                                <option value="visa">Visa</option>
                                <option value="americanexpress">American Express</option>
                                <option value="discover">Discover</option>
                                <option value="capitalone">Capital One</option>
                            </select>


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
                            {/* <Modal.Body className="fieldset"> */}
                                <label className="name--label">Select Vehicle:</label>
                                <input className="modal--input" type="text" onChange={handleVehicleSearch} />

                                {showVehicles === true && vehicles.length > 0 ? (
                                    // <div>Select a Vehicle</div>
                                    <div className={`vehicles--dropdown ${showVehicles ? 'open' : ''}`}>
                                        {vehicles.map(vehicle => {
                                            if (vehicle.is_sold !== true) {
                                                return (
                                                    <>
                                                        <div
                                                            className="vehicles--select"
                                                            id={vehicle.id}
                                                            title={vehicle.floor_price}
                                                            onClick={handleVehicleSelect}
                                                        >
                                                            {`${vehicle.make} ${vehicle.model}`}
                                                            <span 
                                                                className="vin"
                                                                id={vehicle.id}
                                                                title={vehicle.floor_price}
                                                            >
                                                                    #{vehicle.vin}
                                                            </span>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        })}
                                    </div>
                                ) : null}
                            {/* </Modal.Body> */}

                        

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


