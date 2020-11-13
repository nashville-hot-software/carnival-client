import React, { useState, useEffect } from "react";
import SaleCard from "./card";
import DataManager from "../../api/dataManager";
import Modal from 'react-bootstrap/Modal';
import Moment from 'react-moment';  
import "./list.css";

const SaleList = (props) => {
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

    const [cities, setCities] = useState();
    
    // Holds dealership query being typed in to show as input field value (before 
    // dealership selection)
    const [query, setQuery] = useState("");

    const [dealerships, setDealerships] = useState([]);

    // Holds selected dealership from dropdown menu to display as updated value of
    // dealership input field
    const [selectedDealership, setSelectedDealership] = useState("");

    // State for expanding/hiding the dealership dropdown menu
    const [open, setOpen] = useState(false);

    const [show, setShow] = useState(false);
    const [showVehicles, setShowVehicles] = useState(false);
    const [vehicles, setVehicles] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    // Handler for closing the dealership dropdown onBlur
    const handleDropdownClose = () => setOpen(false)
    
    // this won't work until vehicle modal container outside ternary
    const handleCloseVehicleSearch = () => {
        console.log('hello')
        setShowVehicles(false)
    };
    
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
                    setSelectedDealership("")
                    setQuery("")
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
        setQuery(evt.target.value)
    
        if (evt.target.value.length > 0 && selectedDealership === "") {
            DataManager.getAll("dealerships","searchTerm",evt.target.value)
              .then(matchedDealerships => {
                setDealerships(matchedDealerships);
            });
    
            setOpen(true);
        } else if ( selectedDealership !== "") {
            setSelectedDealership(evt.target.value);
        } else {
            setDealerships([]);
    
            setOpen(false)
        }
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
        stateToChange.vehicle_id = parseInt(evt.target.id)
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
        
        setSelectedDealership(evt.target.innerHTML)
    
        const dropdownDiv = document.querySelector('.dealership-list--dropdown')
        dropdownDiv.scrollTop = 0;
      }
    
    useEffect(() => {
        if (newSale.state !== "") {
            DataManager.getCitiesByState(newSale.state)
                .then(response => {
                    setCities(response)
                })
        }
    }, [newSale])
    
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
                            
                                <label className="name--label">Last Name:</label>
                                <input onChange={handleInputFieldChange} id="last_name" className="modal--input" type="text" />
                            
                                <label className="name--label">Email:</label>
                                <input onChange={handleInputFieldChange} id="email" className="modal--input" type="text" />
                            
                                <label className="name--label">Phone:</label>
                                <input onChange={handleInputFieldChange} id="phone" className="modal--input" type="text" />
                            
                                <label className="name--label">Street:</label>
                                <input onChange={handleInputFieldChange} id="street" className="modal--input" type="text" />
                            
                                <label className="name--label">State:</label>
                                <select
                                    onChange={handleInputFieldChange}
                                    id="state"
                                >
                                    <option value="">Select a State</option>
                                    <option value="AL">Alabama</option>
                                    <option value="AK">Alaska</option>
                                    <option value="AZ">Arizona</option>
                                    <option value="AR">Arkansas</option>
                                    <option value="CA">California</option>
                                    <option value="CO">Colorado</option>
                                    <option value="CT">Connecticut</option>
                                    <option value="DE">Delaware</option>
                                    <option value="DC">District Of Columbia</option>
                                    <option value="FL">Florida</option>
                                    <option value="GA">Georgia</option>
                                    <option value="HI">Hawaii</option>
                                    <option value="ID">Idaho</option>
                                    <option value="IL">Illinois</option>
                                    <option value="IN">Indiana</option>
                                    <option value="IA">Iowa</option>
                                    <option value="KS">Kansas</option>
                                    <option value="KY">Kentucky</option>
                                    <option value="LA">Louisiana</option>
                                    <option value="ME">Maine</option>
                                    <option value="MD">Maryland</option>
                                    <option value="MA">Massachusetts</option>
                                    <option value="MI">Michigan</option>
                                    <option value="MN">Minnesota</option>
                                    <option value="MS">Mississippi</option>
                                    <option value="MO">Missouri</option>
                                    <option value="MT">Montana</option>
                                    <option value="NE">Nebraska</option>
                                    <option value="NV">Nevada</option>
                                    <option value="NH">New Hampshire</option>
                                    <option value="NJ">New Jersey</option>
                                    <option value="NM">New Mexico</option>
                                    <option value="NY">New York</option>
                                    <option value="NC">North Carolina</option>
                                    <option value="ND">North Dakota</option>
                                    <option value="OH">Ohio</option>
                                    <option value="OK">Oklahoma</option>
                                    <option value="OR">Oregon</option>
                                    <option value="PA">Pennsylvania</option>
                                    <option value="RI">Rhode Island</option>
                                    <option value="SC">South Carolina</option>
                                    <option value="SD">South Dakota</option>
                                    <option value="TN">Tennessee</option>
                                    <option value="TX">Texas</option>
                                    <option value="UT">Utah</option>
                                    <option value="VT">Vermont</option>
                                    <option value="VA">Virginia</option>
                                    <option value="WA">Washington</option>
                                    <option value="WV">West Virginia</option>
                                    <option value="WI">Wisconsin</option>
                                    <option value="WY">Wyoming</option>
                                </select>

                                <label className="name--label">City:</label>
                                <select onChange={handleInputFieldChange} id="city" >
                                    <option value="0">Select a City</option>
                                    {cities !== undefined ? (
                                        cities.map(city => {
                                            return (
                                                <option value={city.value}>{city.value}</option>
                                            )
                                        })
                                    ) : null}
                                </select>
                            
                            
                                <label className="name--label">Zipcode:</label>
                                <input onChange={handleInputFieldChange} id="zipcode" className="modal--input" type="text" />
                            
                                <label className="name--label">Company Name:</label>
                                <input onChange={handleInputFieldChange} id="company_name" className="modal--input" type="text" />
                            

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


                                {/* This block is for the dealership search dropdown menu (lines 157-184) */}
                                <label className="name--label dealership--label">Dealership:</label>
                                <div onBlur={handleDropdownClose} className={`dealership-list--dropdown ${open ? 'open' : ''}`}>
                                    <input 
                                        className="dealership--search" 
                                        type="text" 
                                        onChange={handleDealershipSearch} 
                                        placeholder="Search Dealerships"
                                        value={`${selectedDealership !== "" ? selectedDealership : query}`}
                                    />

                                    {dealerships.length > 0 ? (
                                        <div className="dealerships-results--container">
                                            {dealerships.map(dealership => {
                                                return (
                                                <>
                                                    <div 
                                                        className={"dealership--select"}
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
                                </div>
                                </Modal.Body>
                            
                                <label className="name--label">Select Vehicle:</label>
                                <input className="modal--input" type="text" onChange={handleVehicleSearch} />

                                <div className="sub-modal--container">
                                {showVehicles === true && vehicles.length > 0 ? (
                                    // <div>Select a Vehicle</div>

                                    // the handle close on blur should close modal but I think this needs
                                    // to be on a div outside of the ternary..
                                    <div onBlur={handleCloseVehicleSearch} className={`vehicles--dropdown ${showVehicles ? 'open' : ''}`}>
                                        {vehicles.map(vehicle => {                                            
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
                                                            type="button disabled"
                                                            
                                                        >
                                                                #{vehicle.vin}
                                                        </span>
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </div>
                                ) : null}
                                </div>

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


