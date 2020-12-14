import React from "react";
import { withRouter } from "react-router-dom";
import "../../styles/nav/nav.css"

const NavBar = props => {
  // const hasUser = props.hasUser;
  // const clearUser = props.clearUser;

  return (
    <>
      <div className="headerBannerTwo">
        <ul className="nav-list" >
          <li className="nav-item">
            <a href="/">Dashboard</a>
          </li>
          <li className="nav-item">
            <a href="/employees">Employees</a>
          </li>
          <li className="nav-item">
          <a href="/sales">Sales</a>
          </li>
          <li className="nav-item">
            <a href="/vehicles">Vehicles</a>
          </li>
          <li className="nav-item">
            <a href="/dealerships">Dealerships</a>
          </li>
        </ul>
      </div>
      </>
  );
};

export default withRouter(NavBar);
