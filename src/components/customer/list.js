import React, { useState, useEffect } from "react";
import CustomerCard from "./card";
import CustomerManager from "../../api/dataManager";

const Customers = props => {
//   const activeUser = props.activeUserId;

  const [customers, setCustomers] = useState([]);

  const getAllCustomers = () => {
    CustomerManager.getAllCustomers().then(customers => {
      setCustomers(customers);
    });
  };

  useEffect(() => {
    getAllCustomers();
  }, []);

  return (
    <>
      <div className="customersContainer">
        {customers.map(customer => {
          return (
            <CustomerCard
              key={customer.id}
              customer={customer}
              getAllcustomers={getAllcustomers}
            />
          );
        })}
      </div>
    </>
  );
};

export default Customers;
