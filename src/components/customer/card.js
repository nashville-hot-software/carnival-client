import React, { useState, useEffect } from "react";
import CustomerManager from "../../api/dataManager";

const CustomerCard = props => {

  const [customer, setCustomer] = useState(props.customer);

//   const deleteFriend = friendId => {
//     if (window.confirm(`Are you sure you want to delete ${user.user.first_name + " " + user.user.last_name} as a friend?`)) {
//       FriendsManager.deleteFriend(friendId).then(() => {
//         props.getAllFriends();
//       });
//     }
//   };

  useEffect(() => {
    console.log(customer)
  }, []);

  return (
    <>
        <div className="customer-card--container">
            <h1>{`${customer.first_name} ${customer.last_name}`}</h1>
        </div>
    </>
  );
};

export default CustomerCard;
