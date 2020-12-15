import React, { useEffect, useState } from "react";
import EmployeeManager from "../../api/dataManager";
import "../../styles/modal/dealershipDropdown.css"
import DropdownMenu from "./dropdownMenu"

const DealershipDropdown = (props) => {
    // (searched dealership results, opening/closing dropdown, 
    // and search query to show in input field value)
    const [dealerships, setDealerships] = useState([]);
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    
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
        <DropdownMenu 
            label={"Dealerships"}
            handleDropdownClose={handleDealershipDropdownClose}
            open={open}
            handleSearch={handleDealershipSearch}
            handleSelect={handleDealerSelect}
            selectedOption={selectedDealership}
            query={query}
            list={dealerships}
        />
    );
};

export default DealershipDropdown;
