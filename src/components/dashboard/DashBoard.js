import React, {useState} from "react"
import { Route, Redirect } from "react-router-dom"
import ActionPieChart from '../charts/PieChart'
import "./DashBoard.css"
import Customers from "../customer/list.js"
import Sales from "../sale/list.js"
import Vehicles from "../vehicle/list.js"

const DashBoard = props => {
    
    return (
      <>
        {/* <ActionPieChart/> */}

        <div className="dashboard-row--1">
          hello
        </div>
        
        <div className="dashboard-row--2">
          <div className="vehicles--container">
            <h2 className="label">Vehicles</h2>
            <Vehicles {...props} />
          </div>

          <div className="customers--container">
            <h2 className="label">Customers</h2>
            <Customers {...props} />
          </div>
          <div className="sales--container">
            <h2 className="label">Sale</h2>
            <Sales {...props} />
          </div>
        </div>
      </>
    )
}
export default DashBoard;