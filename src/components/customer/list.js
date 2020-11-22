import React, { useState, useEffect } from "react";
import CustomerCard from "./card";
import CustomerManager from "../../api/dataManager";
import "./list.css"

const Customers = props => {
//   const activeUser = props.activeUserId;

  // const [customers, setCustomers] = useState([]);

  // const getAllCustomers = () => {
  //   CustomerManager.getAll("sales", "limit", 20).then(sales => {
  //     setCustomers(sales);
  //   });
  // };

  // useEffect(() => {
  //   getAllCustomers();
  // }, []);

  return (
    <>
      <div className="customersContainer">
        {props.customers.map(customer => {
          return (
            <CustomerCard
              key={customer.id}
              customer={customer}
              // getAllCustomers={getAllCustomers}
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
