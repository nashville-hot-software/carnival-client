import React from "react";
import "./modalWrapper.css";
import EmployeeDetailModal from "../employee/modalEditForm"
import AddEmployeeModal from "../employee/modalAddForm"
import VehicleDetailModal from "../vehicle/vehicleDetailsModal"
import CustomerDetailModal from "../customer/customerDetailsModal"
import SaleDetailModal from "../sale/saleDetailsModal"
import SaleEditModal from '../sale/SaleEditModal'
import DealershipDetailModal from "../dealership/modalEditForm"
import AddDealershipModal from "../dealership/modalAddForm"
import AddVehicleModal from "../vehicle/modalAddForm"
import VehicleEditModal from "../vehicle/modalEditForm"

const ModalWrapper = (props) => {
    // debugger;
    return (
        <>
            <div className="modal-bg">
            </div>
            <div className="modal-box">
                {props.filteredEmployee !== undefined && props.employeeCreationView === false ? (
                    <EmployeeDetailModal employee={props.filteredEmployee} {...props} />
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

                {props.matchedSale !== undefined ? (
                    <SaleEditModal
                        sale={props.matchedSale}
                        setMatchedSale={props.setMatchedSale}
                    />
                ) : null}

                {props.filteredDealership !== undefined && props.dealershipCreationView === false ? (
                    <DealershipDetailModal
                        dealership={props.filteredDealership}
                        setFilteredDealership={props.setFilteredDealership}
                    />
                ) : null}

                {props.dealershipCreationView === true ? (
                    <AddDealershipModal setCreationView={props.setCreationView} />
                ) : null}

                {props.matchedVehicle !== undefined && props.vehicleCreationView === false ? (
                    <VehicleEditModal
                        vehicle={props.matchedVehicle}
                        setFilteredVehicle={props.setFilteredVehicle}
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
