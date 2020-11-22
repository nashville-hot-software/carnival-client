import React, { useEffect } from "react";
import "../employee/list.css";
import EmployeeDetailModal from "../employee/modalEditForm"
import AddEmployeeModal from "../employee/modalAddForm"
import VehicleDetailModal from "../vehicle/vehicleDetailsModal"

const ModalWrapper = (props) => {

    return (
            <div className="modal-bg">
                <div className="modal-box">
                    {props.filteredEmployee !== undefined && props.creationView === false? (
                        <EmployeeDetailModal employee={props.filteredEmployee} {...props} />
                    ) : null}
                    
                    {props.creationView === true ? (
                        <AddEmployeeModal setCreationView={props.setCreationView} />
                    ) : null}

                    {props.filteredVehicle !== undefined ? (
                        <VehicleDetailModal filteredVehicle={props.filteredVehicle} />
                    ) : null}
                </div>
            </div>
    );
};

export default ModalWrapper;
