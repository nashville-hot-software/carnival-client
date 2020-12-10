const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/, 'i');
const validPhoneRegex = RegExp(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/, 'i');
const validPriceRegex = RegExp(/^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/, 'i');
const validYearRegex = RegExp(/(?:\bdigit-|\s|^)(\d{4})(?=[.?\s]|-digit\b|$)/, 'i');
const validMilesRegex = RegExp(/^[0-9]{1,6}$/, 'i');
const validWebsiteRegex = RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, 'i');


//      1) function checks all values of state built in form,
//      and assigns error strings if the values are no good
//      2) another function loops through error obj and if any
//      error strings exist, shows error span element in form


    // will pass error state in as arg to this handler function (but can it set that arg state??)
    export const errorHandler = (state, value, errorsState, setErrorsState) => {
        const errors = {...errorsState};

        switch (state) {
            case "email_address":
                errors.email = value !== "" && validEmailRegex.test(value)
                ? '' : 'Email is not valid';
                break;
            case "phone":
                errors.phone = value !== "" && validPhoneRegex.test(value)
                ? '' : 'Phone number is not valid';
                break;
            case "zipcode":
                errors.zipcode = value !== "" && value.length <= 1 
                ? 'First name must be greater than 1 character' : '';
                break;
            case "price":
                errors.price = value !== "" && validPriceRegex.test(value) 
                ? '' : 'Price not valid (no $)';
                break;
            case "floor_price":
                errors.floorPrice = value !== "" && validPriceRegex.test(value) 
                ? '' : 'Floor price not valid (no $)';
                break;
            case "msr_price":
                errors.msrPrice = value !== "" && validPriceRegex.test(value) 
                ? '' : 'Floor price not valid (no $)';
                break;
            case "deposit":
                errors.deposit = value !== "" && validPriceRegex.test(value) 
                ? '' : 'Deposit not valid (no $)';
                break;
            case "year_of_car":
                errors.yearOfCar = value !== "" && validYearRegex.test(value)
                ? '' : 'Please enter 4 digit year';
                break;
            case "miles_count":
                errors.milesCount = value !== "" && validMilesRegex.test(value)
                ? '' : 'Mileage format not valid (no commas)';
                break;
            case "website":
                errors.website = value !== "" && validWebsiteRegex.test(value)
                ? '' : 'Website format not valid (Ex: www.examplewebsite.com)';
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
