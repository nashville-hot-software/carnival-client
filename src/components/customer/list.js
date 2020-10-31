import React, { useState, useEffect } from "react";
import CustomerCard from "./card";
import CustomerManager from "../../api/dataManager";
import "./list.css"

const Customers = props => {
//   const activeUser = props.activeUserId;

  const [customers, setCustomers] = useState([]);

  const getAllCustomers = () => {
    CustomerManager.getAll("customers", "limit", 20).then(customers => {
      setCustomers(customers);
    });
  };

  useEffect(() => {
    getAllCustomers();
  }, []);

  return (
    <>
      <div className="customersContainer">
        {customers.slice(0,20).map(customer => {
          return (
            <CustomerCard
              key={customer.id}
              customer={customer}
              getAllCustomers={getAllCustomers}
              {...props}
            />
          );
        })}
      </div>
    </>
  );
};

export default Customers;
