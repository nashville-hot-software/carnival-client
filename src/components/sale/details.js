import React from "react"
import { modal } from "../../modules/modal/helpers"

const Details = props => {
    return (
        <>
            <div className="modal-details--body">
                <div>
                <strong>Name:</strong>
                {props.updatedSale !== undefined ? (`${props.updatedSale.first_name} ${props.updatedSale.last_name}`) : (`${props.sale.first_name} ${props.sale.last_name}`)}
                </div>

                <div>
                <strong>Price:</strong>
                {props.updatedSale !== undefined ? (props.updatedSale.price) : (props.sale.price)}
                </div>

                <div>
                <strong>Deposit:</strong>
                {props.updatedSale !== undefined ? (props.updatedSale.deposit) : (props.sale.deposit)}
                </div>

                <div>
                <strong>Pickup Date:</strong>
                {props.updatedSale !== undefined ? (props.updatedSale.pickup_date) : (props.sale.pickup_date)}
                </div>

                <div>
                <strong>Email:</strong>
                {props.updatedSale !== undefined ? (props.updatedSale.email) : (props.sale.email)}
                </div>

                <div>
                <strong>InvoiceNumber:</strong>
                {props.updatedSale !== undefined ? (props.updatedSale.invoice_number) : (props.sale.invoice_number)}
                </div>

                <div>
                <strong>Payment Method:</strong>
                {props.updatedSale !== undefined ? (props.updatedSale.payment_method) : (props.sale.payment_method)}
                </div>

                <div>
                <strong>returned:</strong>
                {props.updatedSale !== undefined ? (props.updatedSale.returned) : (props.sale.returned)}
                </div>

                <div>
                <strong>Phone:</strong>
                {props.updatedSale !== undefined ? (props.updatedSale.phone) : (props.sale.phone)}
                </div>

                <div>
                <strong>Company Name:</strong>
                {props.updatedSale !== undefined ? (props.updatedSale.company_name) : (props.sale.company_name)}
                </div>

                <div>
                <strong>employee Id:</strong>
                {props.updatedSale !== undefined ? (props.updatedSale.employee_id) : (props.sale.employee_id)}
                </div>

                <div>
                <strong>City:</strong>
                {props.updatedSale !== undefined ? (props.updatedSale.city) : (props.sale.city)}
                </div>

                <div>
                <strong>State:</strong>
                {props.updatedSale !== undefined ? (props.updatedSale.state) : (props.sale.state)}
                </div>

                <div>
                <strong>zipcode:</strong>
                {props.updatedSale !== undefined ? (props.updatedSale.zipcode) : (props.sale.zipcode)}
                </div>

                <div>
                <strong>City:</strong>
                {props.updatedSale !== undefined ? (props.updatedSale.city) : (props.sale.city)}
                </div>

                <div>
                <strong>sales type id:</strong>
                {props.updatedSale !== undefined ? (props.updatedSale.sales_type_id) : (props.sale.sales_type_id)}
                </div>

                <div>
                <strong>Vehicle Id:</strong>
                {props.updatedSale !== undefined ? (props.updatedSale.vehicle_id) : (props.sale.vehicle_id)}
                </div>

                <div>
                <strong>Dealership:</strong>
                {props.updatedSale !== undefined ? (props.updatedSale.dealership_id) : (props.sale.dealership_id)}
                </div>
            </div>
            <div className="saleDetails--btn--container">
                <button className="closeBtn" onClick={() => modal.handleEditFormClose(props.setEditMode)}>
                    Close
                </button>
            </div>
        </>
    )
}

export default Details;