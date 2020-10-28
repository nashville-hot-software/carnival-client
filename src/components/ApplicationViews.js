import React from "react"
import { Route, Redirect } from "react-router-dom"
import DashBoard from "../components/dashboard/DashBoard.js"
// import Customers from "../components/customer/list.js"

const ApplicationViews = props => {

    return (
        <>   
            <Route exact path="/" render={props => {
                return <DashBoard {...props} />
            }}/>
        </>
    )
}
export default ApplicationViews;