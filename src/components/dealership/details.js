import React from "react"
import { modal } from "../../modules/modal/helpers"

const DealershipDetails = props => {
    return (
        <>
          <div className="modal-details--body">
              <div>
                <strong>Dealership Name:</strong> 
                <span>
                      {props.updatedDealership !== undefined ? (`${props.updatedDealership.business_name}`) 
                      : (`${props.dealership.business_name}`)} 
                </span>
              </div>
              <div>
                <strong>Location:</strong> 
                <span>
                  {props.updatedDealership !== undefined ? (`${props.updatedDealership.city} ${props.updatedDealership.state}`) 
                  : (`${props.dealership.city} ${props.dealership.state}`)}
                </span>
              </div>
              <div>
                <strong>Phone:</strong> 
                <span>
                  {props.updatedDealership !== undefined ? (`${props.updatedDealership.phone}`) 
                  : (`${props.dealership.phone}`)}
                </span>
              </div>
              <div>
                <strong>Website:</strong> 
                <span>
                  {props.updatedDealership !== undefined ? (`${props.updatedDealership.website}`) 
                    : (`${props.dealership.website}`)}
                </span>
              </div>
              <div>
                <strong>Tax ID:</strong> 
                <span>
                  {props.updatedDealership !== undefined ? (`${props.updatedDealership.tax_id}`) 
                    : (`${props.dealership.tax_id}`)}
                </span>
              </div>
          </div>
          <div className="dealershipDetails--btn--container">
              <button onClick={props.handleDelete} className="removeEmployee--btn">
                  Remove
              </button>
              <button 
                className={`closeBtn ${props.dealershipEdited === true ? "disabled" : ""}`} 
                disabled={props.dealershipEdited === true ? true : false}
                onClick={() => modal.handleEditFormClose(props.setEditMode)}
              >
                  Close  
              </button>
          </div>
        </>
    )
}

export default DealershipDetails;