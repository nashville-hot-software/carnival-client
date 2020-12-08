import React, { useEffect } from "react";
// import "./card.css"
import "../../styles/customers/card.css"
import "../employee/list.css"
import "../employee/card.css"


const CustomerDetailModal = props => {

    const handleModalClose = () => {
        document.querySelector(".modal-box").classList.remove("show");
        
        setTimeout(() => {
            document.querySelector(".modal-bg").classList.remove("show");
        }, 300);

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
