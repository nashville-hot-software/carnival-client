import React from "react"
import { Route, Redirect } from "react-router-dom"
import DashBoard from "../components/dashboard/DashBoard.js"
import CustomerDetails from "./customer/detail.js"

const ApplicationViews = props => {

    return (
        <>   
            <Route exact path="/" render={props => {
                return <DashBoard {...props} />
            }}/>

            <Route exact path="/customers/:customerId(\d+)" render={props => {
                return <CustomerDetails customerId={parseInt(props.match.params.customerId)} {...props} />
            }}/>
        </>
    )
}
export default ApplicationViews;