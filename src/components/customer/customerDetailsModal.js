import React, { useEffect } from "react";
import "../../styles/customers/card.css"
import "../../styles/employees/list.css"
import "../../styles/employees/card.css"
import { modal } from "../../modules/modal/helpers"

const CustomerDetailModal = props => {

    const handleModalClose = () => {
        modal.handleClose();

        setTimeout(function () {
            props.setFilteredCustomer();
        }, 700);
    };
  
  return (
    <>
        <div className="modalHeader">
            <div className="employee-details--header">
              <span>Customer</span>
              <span className="employee-id">Customer ID #{props.customer.customer_id}</span>
            </div>
        </div>

        <div className="modal-details--body">
            <div>
                <strong>Name:</strong> 
                {`${props.customer.customer.first_name} ${props.customer.customer.last_name}`}
            </div>
            <div>
                <strong>Email:</strong> 
                {props.customer.customer.email}
            </div>
            <div>
                <strong>Phone:</strong> 
                {props.customer.customer.phone}
            </div>
            <div>
                <strong>Work:</strong> 
                {props.customer.customer.company_name}
            </div>
            <div>
                <strong>Location:</strong> 
                {`${props.customer.customer.street} ${props.customer.customer.city}, ${props.customer.customer.state}, ${props.customer.customer.zipcode}`}
            </div>
        </div>
        
        <div className="dashCustomers--btn--container">
            <button className="closeBtn" onClick={handleModalClose}>
                Close  
            </button>
        </div>
    </>
  );
};

export default CustomerDetailModal;
