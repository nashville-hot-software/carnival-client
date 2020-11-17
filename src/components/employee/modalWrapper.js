import React, { useState, useEffect } from "react";
import "./list.css";

import EmployeeDetailModal from "./modalEditForm"
import AddEmployeeModal from "./modalAddForm"
import CircularIndeterminate from "./spinner"

const ModalWrapper = (props) => {


    return (
            <div class="modal-bg">
                <div class="modal-box">
                    {props.filteredEmployee !== undefined ? (
                        <EmployeeDetailModal employee={props.filteredEmployee} />
                    ) : null}
                    
                    {props.creationView !== false && props.filteredEmployee === undefined ? (
                        <AddEmployeeModal setCreationView={props.setCreationView} />
                    ) : null}
                </div>
            </div>
    );
};

export default ModalWrapper;
