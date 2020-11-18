import React, { useState } from "react";
import EmployeeManager from "../../api/dataManager";
import "./list.css";

const DealershipDropdown = (props) => {

    // Below 4 are for dealership dropdown (opening/closing, searched dealerships, selected, and search query)
    const [dealerships, setDealerships] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedDealership, setSelectedDealership] = useState("");
    const [query, setQuery] = useState("");

    const handleDealershipDropdownClose = () => setOpen(false);

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
        const stateToChange = { ...props.state };
        stateToChange.dealership_id = evt.target.id;
        props.setState(stateToChange);

        setSelectedDealership(evt.target.innerHTML);

        const dropdownDiv = document.querySelector(".dealership-list--dropdown");
        dropdownDiv.scrollTop = 0;
    };

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
        </>
    );
};

export default DealershipDropdown;
