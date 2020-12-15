import React from "react";
import "../../styles/modal/modalWrapper.css"
import EmployeeDetailsEditContainer from "../employee/detailsEditContainer"
import AddEmployeeContainer from "../employee/addFormContainer"
import VehicleDetailModal from "../vehicle/vehicleDetailsModal"
import CustomerDetailModal from "../customer/customerDetailsModal"
import SaleDetailModal from "../sale/saleDetailsModal"
import SaleEditModal from '../sale/SaleEditModal'
import DealershipDetailModal from "../dealership/modalEditForm"
import AddDealershipModal from "../dealership/modalAddForm"
import AddVehicleModal from "../vehicle/addFormContainer"
import VehicleEditModal from "../vehicle/detailsEditContainer"
import AddSaleForm from '../sale/SaleAddForm'

const ModalWrapper = (props) => {
    return (
        <>
            <div className="modal-bg">
            </div>
            <div className="modal--container">
                <div className="modal-box">
                    {props.filteredEmployee !== undefined && props.employeeCreationView === false? (
                        <EmployeeDetailsEditContainer 
                            employee={props.filteredEmployee} 
                            editMode={props.editMode}
                            setEditMode={props.setEditMode}
                            setEmployeeDeleted={props.setEmployeeDeleted}
                        />
                    ) : null}

                    {props.employeeCreationView === true ? (
                        <AddEmployeeContainer setCreationView={props.setCreationView} />
                    ) : null}

                    {props.filteredVehicle !== undefined ? (
                        // For dash
                        <VehicleDetailModal
                            vehicle={props.filteredVehicle}
                            setFilteredVehicle={props.setFilteredVehicle}
                        />
                    ) : null}

                    {props.filteredCustomer !== undefined ? (
                        // For dash
                        <CustomerDetailModal
                            customer={props.filteredCustomer}
                            setFilteredCustomer={props.setFilteredCustomer}
                        />
                    ) : null}
                    
                    {props.filteredSale !== undefined ? (
                        // For dash
                        <SaleDetailModal
                            sale={props.filteredSale}
                            setFilteredSale={props.setFilteredSale}
                        />
                    ) : null}

                    {props.matchedSale !== undefined && props.saleCreationView === false ? (
                        <SaleEditModal
                            sale={props.matchedSale}
                            setMatchedSale={props.setMatchedSale}
                            editMode={props.editMode}
                            setEditMode={props.setEditMode}
                        />
                    ) : null}

                    {props.saleCreationView === true ? (
                        <AddSaleForm
                            setCreationView={props.setCreationView}
                        />
                    ) : null}

                    {props.filteredDealership !== undefined && props.dealershipCreationView === false ? (
                        <DealershipDetailModal
                            dealership={props.filteredDealership}
                            setFilteredDealership={props.setFilteredDealership}
                            editMode={props.editMode}
                            setEditMode={props.setEditMode}
                            setDealershipDeleted={props.setDealershipDeleted}
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
                            setVehicleDeleted={props.setVehicleDeleted}
                        />
                    ) : null}

                    {props.vehicleCreationView === true ? (
                        <AddVehicleModal setCreationView={props.setCreationView} />
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default ModalWrapper;
