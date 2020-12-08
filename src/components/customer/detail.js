import React, { useState, useEffect } from "react";
import CustomerManager from "../../api/dataManager";
import "../../styles/customers/detail.css"

const CustomerDetails = props => {

  const [customer, setCustomer] = useState();

  const getCustomer = () => {
      CustomerManager.getOne("customers", props.customerId)
        .then(response => {
            setCustomer(response)
        })
  }

//   const deleteFriend = friendId => {
//     if (window.confirm(`Are you sure you want to delete ${user.user.first_name + " " + user.user.last_name} as a friend?`)) {
//       FriendsManager.deleteFriend(friendId).then(() => {
//         props.getAllFriends();
//       });
//     }
//   };

  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <>
        {customer !== undefined ? (
            <div className="customer-details--container">
                <h2 className="customer-details--name">{`${customer.first_name} ${customer.last_name}`}</h2>
                <p className="customer-details--email"><strong>Email:</strong> {customer.email}</p>
                <p className="customer-details--phone"><strong>Phone:</strong> {customer.phone}</p>
            </div>
        ) : null}
    </>
  );
};

export default CustomerDetails;
