import React, { useState, useEffect } from "react";
import CustomerCard from "./card";
import CustomerManager from "../../api/dataManager";
import "./list.css"

const Customers = props => {
//   const activeUser = props.activeUserId;

  const [customers, setCustomers] = useState([]);

  const getAllCustomers = () => {
    // Hitting sales endpoint here as the data contains the most-recent
    // customer data that I need for this customer list
    CustomerManager.getAll("sales", "limit", 20).then(sales => {
      setCustomers(sales);
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
