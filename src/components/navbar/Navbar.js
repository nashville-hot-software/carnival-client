import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./nav.css";

const NavBar = props => {
  const hasUser = props.hasUser;
  const clearUser = props.clearUser;

  return (
    <header className="header">
      <div className="headerBannerOne">
        Carnival!
      </div>
      <div className="headerBannerTwo">
        <ul className="nav-list">
            <a href="/"><li>Dashboard</li></a>
            <a><li>Employees</li></a>
            <a><li>Customers</li></a>
            <a><li>Dealerships</li></a>
        </ul>
      </div>
    </header>
  );
};

export default withRouter(NavBar);
