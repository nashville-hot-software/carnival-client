import React from "react";
import "./list.css";

import EmployeeDetailModal from "../employee/modalEditForm"
import AddEmployeeModal from "../employee/modalAddForm"

const ModalWrapper = (props) => {


    return (
            <div class="modal-bg">
                <div class="modal-box">
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
