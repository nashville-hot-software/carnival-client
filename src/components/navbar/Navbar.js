import React from "react";
import { withRouter } from "react-router-dom";
import "./nav.css";
import Nav from 'react-bootstrap/Nav';

const NavBar = props => {
  const hasUser = props.hasUser;
  const clearUser = props.clearUser;

  return (
    <>
      <div className="headerBannerTwo">
        {/* <Nav className="nav-list" activeKey="/">
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
          <Nav.Item>
            <Nav.Link className="nav-item" href="/dealerships" eventKey="link-4">Dealerships</Nav.Link>
          </Nav.Item>
        </Nav> */}
        <ul className="nav-list" >
          <li className="nav-item">
            <a href="/">Dashboard</a>
          </li>
          <li className="nav-item">
            <a>Employees</a>
          </li>
          <li className="nav-item">
            <a>Sales</a>
          </li>
          <li className="nav-item">
            <a>Vehicles</a>
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
