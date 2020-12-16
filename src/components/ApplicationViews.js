import React from "react"
import { Route, Redirect } from "react-router-dom"
import DashBoard from "../components/dashboard/DashBoard.js"
import DealershipList from "./dealership/controllers/searchListContainer"
import EmployeeList from "./employee/controllers/searchListContainer"
import VehiclesList from "./vehicle/controllers/searchListContainer"
import SaleList from "./sale/controllers/searchListContainer"


const ApplicationViews = props => {

    return (
        <>
            <Route exact path="/" render={props => {
                return <DashBoard {...props} />
            }} />

            <Route exact path="/employees" render={props => {
                return <EmployeeList {...props} />
            }} />

            <Route path="/dealerships" render={props => {
                return <DealershipList {...props} />
            }} />

            <Route path="/vehicles" render={props => {
                return <VehiclesList {...props} />
            }} />

            <Route path="/sales" render={props => {
                return <SaleList {...props} />
            }} />
        </>
    )
}

export default ApplicationViews;