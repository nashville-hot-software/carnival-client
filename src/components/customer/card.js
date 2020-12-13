import React from "react";
import "../../styles/customers/card.css"

const CustomerCard = props => {

  return (
    <>
        <div 
          onClick={() => props.showDetailsModal(props.customer, props.customers, props.setFilteredCustomer)} 
          className="customer-card--container"
        >
          <h2 className="customer-card--name">{`${props.customer.customer.first_name} ${props.customer.customer.last_name}`}</h2>
          <p className="customer-card--saleInvoice"><span className="label">Invoice:</span> {`#${props.customer.invoice_number}`}</p>
        </div>
    </>
  );
};

export default CustomerCard;
