import React from "react"
import DashBoard from "../components/dashboard/DashBoard.js"
import { Route, Redirect } from "react-router-dom"
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