import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./nav.css";
import Nav from 'react-bootstrap/Nav';

const NavBar = props => {
  const hasUser = props.hasUser;
  const clearUser = props.clearUser;

  return (
    <header className="header">
      <div className="headerBannerOne">
        Carnival!
      </div>
      <div className="headerBannerTwo">
        {/* <ul className="nav-list">
            <a href="/"><li>Dashboard</li></a>
            <a><li>Employees</li></a>
            <a><li>Customers</li></a>
            <a><li>Dealerships</li></a>
        </ul> */}
        <Nav className="nav-list" activeKey="/">
          <Nav.Item>
            <Nav.Link className="nav-item" href="/">Dashboard</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="nav-item" eventKey="link-1">Employees</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="nav-item" eventKey="link-2">Sales</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="nav-item" eventKey="link-3">Vehicles</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>

    </header>
  );
};

export default withRouter(NavBar);
