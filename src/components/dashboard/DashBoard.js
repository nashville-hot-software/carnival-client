import React from "react"
import { Route, Redirect } from "react-router-dom"
import ActionPieChart from '../charts/PieChart'
import Customers from "../customer/list.js"

const DashBoard = props => {

    
    return (
      <>
        {/* <ActionPieChart/> */}

        <Customers {...props} />
      </>
    )
}
export default DashBoard;