import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
// import "./NavBar.css";

const NavBar = props => {
  const hasUser = props.hasUser;
  const clearUser = props.clearUser;

  return (
    <header className="header">
      <div className="headerBannerOne">
        <h1>Carnival!</h1>
      </div>
      <div className="headerBannerTwo">
        <ul>
            <a><li>Employees</li></a>
            <a><li>Customers</li></a>
            <a><li>Dealerships</li></a>
        </ul>
      </div>
    </header>
  );
};

export default withRouter(NavBar);
