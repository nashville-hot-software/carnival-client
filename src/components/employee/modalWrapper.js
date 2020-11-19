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
