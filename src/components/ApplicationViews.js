import React from "react"
import { Route, Redirect } from "react-router-dom"
import DashBoard from "../components/dashboard/DashBoard.js"
// import Customers from "../components/customer/list.js"

const ApplicationViews = props => {

    return (
        <>
           
            <Route exact path="/home" render={props => {
                // if (hasUser) {
                    return <DashBoard />
                // } else {
                //     return <Redirect to="/" />
                // }
            }}/>
         
        </>
    )
}
export default ApplicationViews;