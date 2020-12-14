import React from "react";
import CustomerCard from "./card";
import "../../styles/customers/list.css"

const Customers = props => {

  return (
    <>
      <div className="customersContainer">
        {props.customers.map(customer => {
          return (
            <CustomerCard
              key={customer.id}
              customer={customer}
              customers={props.customers}
              setFilteredCustomer={props.setFilteredCustomer}
              showDetailsModal={props.showDetailsModal}
              {...props}
            />
          );
        })}
      </div>
    </>
  );
};

export default Customers;
