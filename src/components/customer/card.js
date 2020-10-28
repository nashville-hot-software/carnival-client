import React, { useState, useEffect } from "react";
import CustomerManager from "../../api/dataManager";
import "./card.css"

const CustomerCard = props => {

  const [customer, setCustomer] = useState(props.customer);

//   const deleteFriend = friendId => {
//     if (window.confirm(`Are you sure you want to delete ${user.user.first_name + " " + user.user.last_name} as a friend?`)) {
//       FriendsManager.deleteFriend(friendId).then(() => {
//         props.getAllFriends();
//       });
//     }
//   };

  return (
    <>
        <div onClick={() => props.history.push(`/customers/${customer.id}`)} className="customer-card--container">
            <h2 className="customer-card--name">{`${customer.first_name} ${customer.last_name}`}</h2>
        </div>
    </>
  );
};

export default CustomerCard;
