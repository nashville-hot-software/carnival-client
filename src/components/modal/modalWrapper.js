import React from "react";
import "../employee/list.css";
import EmployeeDetailModal from "../employee/modalEditForm"
import AddEmployeeModal from "../employee/modalAddForm"
import VehicleDetailModal from "../vehicle/vehicleDetailsModal"
import CustomerDetailModal from "../customer/customerDetailsModal"
import SaleDetailModal from "../sale/saleDetailsModal"
import DealershipDetailModal from "../dealership/modalEditForm"
import AddDealershipModal from "../dealership/modalAddForm"

const ModalWrapper = (props) => {

    return (
            <div className="modal-bg">
                <div className="modal-box">
                    {props.filteredEmployee !== undefined && props.employeeCreationView === false? (
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
                    
                    {props.filteredDealership !== undefined && props.dealershipCreationView === false ? (
                        <DealershipDetailModal 
                            dealership={props.filteredDealership} 
                            setFilteredDealership={props.setFilteredDealership}
                        />
                    ) : null}

                    {props.dealershipCreationView === true ? (
                        <AddDealershipModal setCreationView={props.setCreationView} />
                    ) : null}
                    
                    {/* {props.filteredVehicle !== undefined && props.vehicleCreationView === false ? (
                        <DealershipDetailModal 
                            vehicle={props.filteredVehicle} 
                            setFilteredVehicle={props.setFilteredVehicle}
                        />
                    ) : null}

                    {props.vehicleCreationView === true ? (
                        <AddDealershipModal setCreationView={props.setCreationView} />
                    ) : null} */}
                </div>
            </div>
    );
};

export default ModalWrapper;
