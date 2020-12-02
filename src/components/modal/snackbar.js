import React from "react"
import "./snackbar.css"

const SuccessSnackbar = (props) => {

    if (props.postedEmployee !== undefined) {
        document.querySelector('.snackbar').classList.add('show');

        setTimeout(() => {
            document.querySelector('.snackbar').classList.remove('show');

            props.setPostedEmployee();
        }, 2500)
    }

    return (
        <div className="snackbar">
            <h1>Great Success!</h1>
        </div>
    );
}

export default SuccessSnackbar;