import React, { useEffect } from "react";
import "./card.css"
import "../employee/list.css"
import "../employee/card.css"


const CustomerDetailModal = props => {

  const handleModalClose = () => {
    props.setFilteredCustomer();

    document.querySelector(".modal-bg").classList.add("fade-out");
    document.querySelector(".modal-box").classList.add("fade-out");

    setTimeout(function () {
        document.querySelector(".modal-box").classList.remove("fade-out");
        document.querySelector(".modal-bg").classList.remove("fade-out");
        document.querySelector(".modal-box").classList.remove("show");
        document.querySelector(".modal-bg").classList.remove("show");
    }, 500);
  };

  useEffect(() => {
    console.log(props.customer)
  }, [])


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
        
        <div className="employee--btn--container">
            <button className="closeBtn" onClick={handleModalClose}>
                Close  
            </button>
        </div>
    </>
  );
};

export default CustomerDetailModal;
