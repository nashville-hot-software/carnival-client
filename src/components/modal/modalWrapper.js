import React, { useEffect } from "react";
import "../employee/list.css";
import EmployeeDetailModal from "../employee/modalEditForm"
import AddEmployeeModal from "../employee/modalAddForm"

const ModalWrapper = (props) => {

    return (
            <div className="modal-bg">
                <div className="modal-box">
                    {props.filteredEmployee !== undefined && props.creationView === false? (
                        <EmployeeDetailModal employee={props.filteredEmployee} {...props} />
                    ) : null}
                    
                    {props.creationView !== false ? (
                        <AddEmployeeModal setCreationView={props.setCreationView} />
                    ) : null}
                </div>
            </div>
    );
};

export default ModalWrapper;
