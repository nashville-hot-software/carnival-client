import React from "react"
import EmployeeCard from "./card";
import { modal } from "../../modules/modal/helpers"

const SearchList = props => {
    return (
        <div className="employees--container">
            <div className="employees--subContainer">
                <div className="employees--header">
                    Employees
                </div>

                <input
                    className="employees-searchBar"
                    type="text"
                    onChange={props.handleEmployeeSearch}
                    placeholder="Search for Employees"
                />

                <div className="searchResults employee">
                    {props.employees.length > 0 ? (
                        <>
                            {props.employees.map((employee, i) => {
                                return (
                                    <EmployeeCard
                                        key={i}
                                        employee={employee}
                                        showDetailsModal={props.showDetailsModal}
                                        {...props}
                                    />
                                );
                            })}
                        </>
                    ) : null}
                </div>

                <button onClick={() => modal.handleShow(props.setCreationView)} className="addEmployee--btn">
                    Add New Employee
                </button>
            </div>
        </div>
    )
}

export default SearchList;