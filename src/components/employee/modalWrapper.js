import React, { useEffect } from "react";
import "./list.css";
import EmployeeDetailModal from "./modalEditForm"
import AddEmployeeModal from "./modalAddForm"

const ModalWrapper = (props) => {

    useEffect(() => {

    }, [props.filteredEmployee])

    return (
            <div className="modal-bg">
                <div className="modal-box">
                    {/* 
                        The bug with the edit modal is coming from here ... 
                        props.filteredEmployee state is lagging one behind on modal render 

                        So, the filtered employee passed into the details modal is good 
                        (console log in the child component works fine), its in the form
                        values -- whenever I start typing the handleFieldChange() logs the old
                        employee state.
                    */}
                    {props.filteredEmployee !== undefined && props.creationView === false? (
                        <EmployeeDetailModal employee={props.filteredEmployee} />
                    ) : null}
                    
                    {props.creationView !== false ? (
                        <AddEmployeeModal setCreationView={props.setCreationView} />
                    ) : null}
                </div>
            </div>
    );
};

export default ModalWrapper;
