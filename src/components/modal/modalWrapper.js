import React from "react";
import "./modalWrapper.css";
import EmployeeDetailModal from "../employee/modalEditForm"
import AddEmployeeModal from "../employee/modalAddForm"
import VehicleDetailModal from "../vehicle/vehicleDetailsModal"
import CustomerDetailModal from "../customer/customerDetailsModal"
import SaleDetailModal from "../sale/saleDetailsModal"
import DealershipDetailModal from "../dealership/modalEditForm"
import AddDealershipModal from "../dealership/modalAddForm"
import AddVehicleModal from "../vehicle/modalAddForm"
import VehicleEditModal from "../vehicle/modalEditForm"

const ModalWrapper = (props) => {

    return (
        <>
            <div className="modal-bg">
            </div>
            <div className="modal-box">
                {props.filteredEmployee !== undefined && props.employeeCreationView === false? (
                    <EmployeeDetailModal 
                        employee={props.filteredEmployee} 
                        editMode={props.editMode}
                        setEditMode={props.setEditMode}
                        setEmployeeDeleted={props.setEmployeeDeleted}
                    />
                ) : null}
                
                {props.employeeCreationView === true ? (
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
                
                {props.filteredDealership !== undefined && props.dealershipCreationView === false ? (
                    <DealershipDetailModal 
                        dealership={props.filteredDealership} 
                        setFilteredDealership={props.setFilteredDealership}
                        editMode={props.editMode}
                        setEditMode={props.setEditMode}
                    />
                ) : null}

                {props.dealershipCreationView === true ? (
                    <AddDealershipModal setCreationView={props.setCreationView} />
                ) : null}
                
                {props.matchedVehicle !== undefined && props.vehicleCreationView === false ? (
                    <VehicleEditModal 
                        vehicle={props.matchedVehicle} 
                        setFilteredVehicle={props.setFilteredVehicle}
                        vehicleEdited={props.vehicleEdited}
                        setVehicleEdited={props.setVehicleEdited}
                    />
                ) : null}

                {props.vehicleCreationView === true ? (
                    <AddVehicleModal setCreationView={props.setCreationView} />
                ) : null} 
            </div>
        </>
    );
};

export default ModalWrapper;
