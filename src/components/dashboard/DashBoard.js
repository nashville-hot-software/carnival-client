import React from "react"
import { Route, Redirect } from "react-router-dom"
import ActionPieChart from '../charts/PieChart'
import Customers from "../customer/list.js"
import SaleList from "../sale/SaleList"

const DashBoard = props => {

    
    return (
      <>
        {/* <ActionPieChart/> */}

        <Customers {...props} />
        <SaleList {...props} />
      </>
    )
}
export default DashBoard;