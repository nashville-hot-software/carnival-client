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
              showCustomersModal={props.showCustomersModal}
              {...props}
            />
          );
        })}
      </div>
    </>
  );
};

export default Customers;
