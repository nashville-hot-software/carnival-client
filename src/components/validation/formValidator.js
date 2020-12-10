const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/, 'i');
const validPhoneRegex = RegExp(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/, 'i');
const validStreetRegex = RegExp(/^\s*\S+(?:\s+\S+){2}/, 'i');


//      1) function checks all values of state built in form,
//      and assigns error strings if the values are no good
//      2) another function loops through error obj and if any
//      error strings exist, shows error span element in form


    // will pass error state in as arg to this handler function (but can it set that arg state??)
    export const errorHandler = (state, value, errorsState, setErrorsState) => {
        const errors = {...errorsState};

        switch (state) {
            case "first_name":
                errors.firstName = value !== "" && value.length <= 1 ? 'First name must be greater than 1 character' : '';
                break;
            case "last_name":
                errors.lastName = value !== "" && value.length <= 4 
                ? 'Last name must be greater than 4 characters' : '';
                break;
            case "email_address":
                errors.email = value !== "" && validEmailRegex.test(value)
                ? '' : 'Email is not valid';
                break;
            case "phone":
                errors.phone = value !== "" && validPhoneRegex.test(value)
                ? '' : 'Phone number is not valid';
                break;
            case "street":
                errors.street = value !== "" && validStreetRegex.test(value)
                ? '' : 'Street address is not valid';
                break;
            case "city":
                errors.city = value !== "" && value <= 1 
                ? 'First name must be greater than 1 character' : '';
                break;
            case "zipcode":
                errors.zipcode = value !== "" && value <= 1 
                ? 'First name must be greater than 1 character' : '';
                break;
            case "price":
                errors.price = value !== "" && value <= 1 
                ? 'First name must be greater than 1 character' : '';
                break;
            case "deposit":
                errors.deposit = value !== "" && value <= 1 
                ? 'First name must be greater than 1 character' : '';
                break;
            default:
                break;
        }

        setErrorsState(errors);
    };

    export const validateForm = (errors) => {
        let valid = true;
        console.log(Object.values(errors))
        Object.values(errors).forEach(
          // if we have an error string set valid to false
          (val) => val.length > 0 && (valid = false)
        );
        return valid;
    };
