import React from "react"
import { Route, Redirect } from "react-router-dom"
import DashBoard from "../components/dashboard/DashBoard.js"
import CustomerDetails from "./customer/detail.js"
import VehicleDetails from "./vehicle/detail.js"
import SaleDetails from "./sale/detail.js"

const ApplicationViews = props => {

    return (
        <>   
            <Route exact path="/" render={props => {
                return <DashBoard {...props} />
            }}/>

            <Route exact path="/customers/:customerId(\d+)" render={props => {
                return <CustomerDetails customerId={parseInt(props.match.params.customerId)} {...props} />
            }}/>

            <Route exact path="/vehicles/:vehicleId(\d+)" render={props => {
                return <VehicleDetails vehicleId={parseInt(props.match.params.vehicleId)} {...props} />
            }}/>
            <Route exact path="/sales/:saleId(\d+)" render={props => {
                return <SaleDetails vehicleId={parseInt(props.match.params.saleId)} {...props} />
            }}/>
        </>
    )
}
export default ApplicationViews;