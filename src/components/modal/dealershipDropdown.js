//move Dealership Dropdown and Employee Type Select menu out of 'employees' folder and into the new 'modal' folder 


import React, { useEffect, useState } from "react";
import EmployeeManager from "../../api/dataManager";
import "../../styles/modal/dealershipDropdown.css"

const DealershipDropdown = (props) => {

    // (searched dealership results, opening/closing dropdown, 
    // and search query to show in input field value)
    const [dealerships, setDealerships] = useState([]);
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");

    // for dealership dropdown component
    const [selectedDealership, setSelectedDealership] = useState("");

    // Conditionals to either search for dealerships and map the list, 
    // OR update selectedDealership state to allow user to change input 
    // value to a new value, OR close the dropdown if no search value
    const handleDealershipSearch = (evt) => {
        setQuery(evt.target.value);

        if (evt.target.value.length > 0 && selectedDealership === "") {
            EmployeeManager.getAll("dealerships", "searchTerm", evt.target.value)
                .then((matchedDealerships) => {
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
        const stateToChange = props.state;
        stateToChange.dealership_id = parseInt(evt.target.id);

        // for search input value
        setSelectedDealership(evt.target.innerHTML);
        
        // resets query to empty string so when request is finished the query value will be reset
        setQuery("");

        document.querySelector(".dealership-list--dropdown").scrollTop = 0;
    };

    const handleDealershipDropdownClose = () => setOpen(false);

    useEffect(() => {
        setSelectedDealership("");

        document.querySelector(".dealership--search").value = "";

    }, [props.employeeUpdated, props.postedEmployee, props.postedSale])

    return (
        <>
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
                value={`${selectedDealership !== "" ? selectedDealership : query}`}
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
        </>
    );
};

export default DealershipDropdown;
