import React from "react";
import "../employee/list.css";
import EmployeeDetailModal from "../employee/modalEditForm"
import AddEmployeeModal from "../employee/modalAddForm"
import VehicleDetailModal from "../vehicle/vehicleDetailsModal"
import CustomerDetailModal from "../customer/customerDetailsModal"
import SaleDetailModal from "../sale/saleDetailsModal"

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
                        <VehicleDetailModal 
                            vehicle={props.filteredVehicle} 
                            setFilteredVehicle={props.setFilteredVehicle}
                        />
                    ) : null}
                    
                    {props.filteredCustomer !== undefined ? (
                        <CustomerDetailModal 
                            customer={props.filteredCustomer} 
                            setFilteredCustomer={props.setFilteredCustomer}
                        />
                    ) : null}
                    
                    {props.filteredSale !== undefined ? (
                        <SaleDetailModal 
                            sale={props.filteredSale} 
                            setFilteredSale={props.setFilteredSale}
                        />
                    ) : null}
                </div>
            </div>
    );
};

export default ModalWrapper;
