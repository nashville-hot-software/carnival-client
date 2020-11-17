import React, { useState, useEffect } from "react";
import EmployeeManager from "../../api/dataManager";
import "./list.css";

const AddEmployeeModal = (props) => {

    // Skeleton for new employee to be POSTed
    const [newEmployee, setNewEmployee] = useState({
        first_name: "",
        last_name: "",
        email_address: "",
        phone: "",
        dealership_id: 1,
        employee_type_id: 1,
    });

    const [employeeTypes, setEmployeeTypes] = useState([]);

    // Below 4 are for dealership dropdown (opening/closing, searched dealerships, selected, and search query)
    const [dealerships, setDealerships] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedDealership, setSelectedDealership] = useState("");
    const [query, setQuery] = useState("");

    const handleClose = () => {
        props.setCreationView(false)

        const inputs = document.querySelectorAll('input')
        const selects = document.querySelectorAll('select')

        inputs.forEach(input => input.value = "")
        selects.forEach(select => select.value = "none")

        document.querySelector(".modal-bg").classList.add("fade-out");
        document.querySelector(".modal-box").classList.add("fade-out");

        setTimeout(function () {
            document.querySelector(".modal-box").classList.remove("fade-out");
            document.querySelector(".modal-bg").classList.remove("fade-out");
            document.querySelector(".modal-box").classList.remove("show");
            document.querySelector(".modal-bg").classList.remove("show");
        }, 1000);
    };

    const handleDealershipDropdownClose = () => setOpen(false);

    const fetchEmployeeTypes = () => {
        EmployeeManager.getAll("employeetypes").then((employeeTypes) => {
            setEmployeeTypes(employeeTypes);
        });
    };

    const handleInputFieldChange = (evt) => {
        const stateToChange = { ...newEmployee };
        stateToChange[evt.target.id] = evt.target.value;
        setNewEmployee(stateToChange);
    };

    // Pings API for all dealerships matching dealership input value ,
    // Setting query state for the input field so we can dynamically set the value of the text input,
    // Conditionals to either search for dealerships and map the list, OR set a selected dealership
    // to show as the new input value
    const handleDealershipSearch = (evt) => {
        setQuery(evt.target.value);

        if (evt.target.value.length > 0 && selectedDealership === "") {
            EmployeeManager.getAll(
                "dealerships",
                "searchTerm",
                evt.target.value
            ).then((matchedDealerships) => {
                setDealerships(matchedDealerships);
            });

            setOpen(true);
        } else if (selectedDealership !== "") {
            setSelectedDealership(evt.target.value);
        } else {
            setDealerships([]);

            setOpen(false);
        }
    };

    const handleDealerSelect = (evt) => {
        const stateToChange = { ...newEmployee };
        stateToChange.dealership_id = evt.target.id;
        setNewEmployee(stateToChange);

        setSelectedDealership(evt.target.innerHTML);

        const dropdownDiv = document.querySelector(".dealership-list--dropdown");
        dropdownDiv.scrollTop = 0;
    };

    const handleSubmit = () => {
        if (newEmployee.first_name === "" || newEmployee.last_name === "") {
            window.alert("Please fill out employee name fields");
        } else if (newEmployee.email_address === "") {
            window.alert("Please enter an email address");
        } else if (newEmployee.phone === "") {
            window.alert("Please enter a phone number");
        } else if (newEmployee.dealership_id === 0) {
            window.alert("Please select a valid dealership");
        } else if (newEmployee.employee_type_id === 0) {
            window.alert("Please select a valid employee type");
        } else {
            // Make the POST, then clear all data from form
            EmployeeManager.PostData("employees", newEmployee).then(() => {
                setNewEmployee({
                    first_name: "",
                    last_name: "",
                    email_address: "",
                    phone: "",
                    dealership_id: 0,
                    employee_type_id: 0,
                });
                
                const inputs = document.querySelectorAll('input')
                const selects = document.querySelectorAll('select')

                inputs.forEach(input => input.value = "")
                selects.forEach(select => select.value = "none")

                setSelectedDealership("");
                setQuery("");
            });
        }
    };

    useEffect(() => {
        fetchEmployeeTypes();
    }, []);

    return (
        <>
            <div className="modalHeader">
                Add Employee

                {/* <ul>
                    <li class="ele">
                        <div
                            type="button"
                            onClick={handleClose}
                            className="x spin large "
                        >
                            <b></b>
                            <b></b>
                            <b></b>
                            <b></b>
                        </div>
                    </li>
                </ul> */}
            </div>

            <label className="name--label">First Name:</label>
            <input
                onChange={handleInputFieldChange}
                id="first_name"
                className="modal--input"
                type="text"
            />

            <label className="name--label">Last Name:</label>
            <input
                onChange={handleInputFieldChange}
                id="last_name"
                className="modal--input"
                type="text"
            />

            <label className="name--label">Email:</label>
            <input
                onChange={handleInputFieldChange}
                id="email_address"
                className="modal--input"
                type="text"
            />

            <label className="name--label">Phone:</label>
            <input
                onChange={handleInputFieldChange}
                id="phone"
                className="modal--input"
                type="text"
            />

            {/* DROPDOWN MENU START */}
            <label className="name--label dealership--label">Dealership:</label>
            <div
                onBlur={handleDealershipDropdownClose}
                className={`dealership-list--dropdown ${open ? "open" : ""}`}
            >
                <input
                    className="dealership--search"
                    type="text"
                    onChange={handleDealershipSearch}
                    placeholder="Search Dealerships"
                    value={`${selectedDealership !== "" ? selectedDealership : query
                        }`}
                />

                {dealerships.length > 0 ? (
                    <div className="dealerships-results--container">
                        {dealerships.map((dealership) => {
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
                            );
                        })}
                    </div>
                ) : null}
            </div>
            {/* DROPDOWN MENU END */}

            {employeeTypes !== undefined ? (
                <>
                    <label className="employeeType--label">
                        Select Employee Type
                    </label>
                    <select
                        id="employee_type_id"
                        onChange={handleInputFieldChange}
                        className="employeeType--select"
                    >
                        {" "}
                        <option value="none" selected disabled hidden>
                            Select an Option
                        </option>
                        {employeeTypes.map((type) => {
                            return (
                                <>
                                    <option value={type.id}>{type.name}</option>
                                </>
                            );
                        })}
                    </select>
                </>
            ) : null}
            <div classname="addEmployee--btn--container">
                <button onClick={handleSubmit} className="modal--addBtn addEmployee--btn">
                    Add Employee 
                </button>
                <button className="closeBtn" onClick={handleClose}>
                    Close  
                </button>
            </div>
        </>
    );
};

export default AddEmployeeModal;
