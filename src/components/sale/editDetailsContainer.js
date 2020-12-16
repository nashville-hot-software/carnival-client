import React, { useState, useEffect } from "react";
import "../../styles/sales/card.css"
import DataManager from "../../api/dataManager";
import { errorHandler, validateForm } from "../validation/formValidator"
import { modal } from "../../modules/modal/helpers"
import EditDetailsWrapper from "./editDetailsWrapper"

const SaleEditModal = (props) => {

  const [sale, setSale] = useState();
  const [selectedState, setSelectedState] = useState();
  const [selectedPaymentType, setSelectedPaymentType] = useState();
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    zipcode: '',
    price: '',
    deposit: ''
  });

  const handleInputFieldChange = (evt) => {
    errorHandler(evt.target.id, evt.target.value, errors, setErrors);

    var stateToChange = { ...sale };
    stateToChange[evt.target.id] = evt.target.value;
    console.log(stateToChange);
    setSale(stateToChange);
  };

  const handleEditSubmit = (evt) => {
    evt.preventDefault();
    if (
      sale.first_name === "" ||
      sale.last_name === "" ||
      sale.email === "" ||
      sale.company_name === "" ||
      sale.phone === "" ||
      sale.dealership_id === "" ||
      sale.sales_type_id === "" ||
      sale.vehicle_id === "" ||
      sale.street === "" ||
      sale.city === "" ||
      sale.state === "" ||
      sale.zipcode === "" ||
      sale.price === "" ||
      sale.deposit === ""
    ) {
      alert("Please fill out all the fields");
    } else if (sale !== undefined) {
      
      console.log(sale);
      
      if (validateForm(errors)) {
        DataManager.update("sales", sale, props.sale.id)
        // Later update API to return updated obj on the PUT response instead of re-fetching
        .then(() => {
          DataManager.getOne("sales", props.sale.id).then((data) => {
            console.log(data[0]);
            setSale(data[0]);
          });
        })
        .then(() => {
          modal.clearForm();
          props.setEditMode(false);
          const muiSwitch = document.querySelector(".MuiSwitch-switchBase");
          if (muiSwitch.classList.contains("Mui-checked")) {
            muiSwitch.click();
          }
        });
      }else {
        alert("Please fix form entries")
      }
    }
  };

  useEffect(() => {
    DataManager.getOne("sales", props.sale.id).then((data) => {
      setSale(data[0]);
      setSelectedState(data.state);
      setSelectedPaymentType(data.payment_method);
    });
  }, [props.sale]);

  return (
    <EditDetailsWrapper 
      updatedSale={sale}
      setSale={setSale}
      sale={props.sale}
      handleInputFieldChange={handleInputFieldChange}
      errors={errors}
      handleEditSubmit={handleEditSubmit}
      editMode={props.editMode}
      setEditMode={props.setEditMode}
      selectedPaymentType={selectedPaymentType}
      selectedState={selectedState}
    />
  );
};
export default SaleEditModal;
