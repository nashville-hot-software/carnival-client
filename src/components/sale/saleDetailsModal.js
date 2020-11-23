import React, { useEffect } from "react";
import "./card.css"
import "../employee/list.css"
import "../employee/card.css"
import NumberFormat from 'react-number-format';


const SaleDetailModal = props => {

  const handleModalClose = () => {
    props.setFilteredSale();

    document.querySelector(".modal-bg").classList.add("fade-out");
    document.querySelector(".modal-box").classList.add("fade-out");

    setTimeout(function () {
        document.querySelector(".modal-box").classList.remove("fade-out");
        document.querySelector(".modal-bg").classList.remove("fade-out");
        document.querySelector(".modal-box").classList.remove("show");
        document.querySelector(".modal-bg").classList.remove("show");
    }, 500);
  };
  
  return (
    <>
        <div className="modalHeader">
            <div className="employee-details--header">
              <span>Sale</span>
              <span className="employee-id">#{props.sale.id}</span>
            </div>
        </div>

        <div className="modal-details--body">
            <div>
                <strong>Invoice Number:</strong> 
                {`#${props.sale.invoice_number}`}
            </div>
            <div>
                <strong>Dealership:</strong> 
                {`${props.sale.dealership.business_name}`}
            </div>
            <div>
                <strong>Customer:</strong> 
                {`${props.sale.customer.first_name} ${props.sale.customer.last_name}`}
            </div>
            <div>
                <strong>Purchase Date:</strong> 
                {`${props.sale.purchase_date}`}
            </div>
            <div>
                <strong>Pickup Date:</strong> 
                {`${props.sale.pickup_date}`}
            </div>
            <div>
                <strong>Vehicle:</strong> 
                {`${props.sale.vehicle.year_of_car} ${props.sale.vehicle.engine_type} ${props.sale.vehicle.vehicle_type.make} ${props.sale.vehicle.vehicle_type.model}`}
            </div>
            <div>
                <strong>Sales Type:</strong> 
                {`${props.sale.sales_type.name}`}
            </div>
            <div>
                <strong>Deposit:</strong> 
                <NumberFormat value={props.sale.deposit} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </div>
            <div>
                <strong>Price:</strong> 
                <NumberFormat value={props.sale.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </div>
            <div>
                <strong>Returned:</strong> 
                {props.sale.returned ? 'Yes' : 'No'}
            </div>
        </div>

        {/* <Modal centered show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title><strong>Invoice</strong> {""}#{props.row.invoice_number}</Modal.Title>
            </Modal.Header>
            <Modal.Body><strong>Customer Name:{"   "}</strong> {`${props.row.customer.first_name} ${props.row.customer.last_name}`}</Modal.Body>
            <Modal.Body><strong>Dealership:</strong> {`${props.row.dealership.business_name}`}</Modal.Body>
            <Modal.Body><strong>State:</strong> {`${props.row.dealership.state}`}</Modal.Body>
            <Modal.Body><strong>Car Purchased:</strong> {`${props.row.vehicle.vehicle_type.make}`}{  " "} {`${props.row.vehicle.vehicle_type.model}`}</Modal.Body>
            <Modal.Body><strong>Price:</strong>{"   "}<NumberFormat value={props.row.price} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </Modal.Body>
            <Modal.Body><strong>Deposit:</strong>{"   "}<NumberFormat value={props.row.deposit} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Modal.Body>
            <Modal.Body><strong>Payment Method:</strong>{"   "} {`${props.row.payment_method}`}</Modal.Body>
            <Modal.Body><strong>Purchase Date:</strong>{"   "} {`${props.row.purchase_date}`}</Modal.Body>
            <Modal.Body><strong>Pickup Date:</strong> {"   "}{`${props.row.pickup_date}`}</Modal.Body>
        </Modal> */}
        
        <div className="employee--btn--container">
            <button className="closeBtn" onClick={handleModalClose}>
                Close  
            </button>
        </div>
    </>
  );
};

export default SaleDetailModal;
