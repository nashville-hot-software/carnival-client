const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/, 'i');
const validPhoneRegex = RegExp(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/, 'i');
const validStreetRegex = RegExp(/^\s*\S+(?:\s+\S+){2}/, 'i');


//      1) function checks all values of state built in form,
//      and assigns error strings if the values are no good
//      2) another function loops through error obj and if any
//      error strings exist, shows error span element in form


    // will pass error state in as arg to this handler function (but can it set that arg state??)
    export const errorHandler = (state, errorsState, setErrorsState) => {
        const errors = {...errorsState};

        switch (true) {
            case state.first_name !== undefined:
                errors.firstName = state.first_name !== undefined && state.first_name !== "" && state.first_name.length <= 1 
                ? 'First name must be greater than 1 character' : '';

            case state.last_name !== undefined:
                errors.lastName = state.last_name !== undefined && state.last_name !== "" && state.last_name.length <= 4 
                ? 'Last name must be greater than 4 characters' : '';

            case state.email_address !== undefined:
                // create a good RegExp for this
                errors.email = state.email_address !== undefined && state.email_address !== "" && validEmailRegex.test(state.email_address)
                ? '' : 'Email is not valid';

            case state.phone !== undefined:
                // create a good RegExp for this
                errors.phone = state.phone !== undefined && state.phone !== "" && validPhoneRegex.test(state.phone)
                ? '' : 'Phone number is not valid';

            case state.street !== undefined:
                // create a good RegExp for this
                errors.street = state.street !== undefined && state.street !== "" && validStreetRegex.test(state.street)
                ? '' : 'Street address is not valid';

            case state.city !== undefined:
                // create a good RegExp for this
                errors.city = state.city !== undefined && state.city !== "" && state.city.length <= 1 
                ? 'First name must be greater than 1 character' : '';
                
            case state.zipcode !== undefined:
                // create a good RegExp for this
                errors.zipcode = state.zipcode !== undefined && state.zipcode !== "" && state.zipcode.length <= 1 
                ? 'First name must be greater than 1 character' : '';
                
            case state.price !== undefined:
                // create a good RegExp for this
                errors.price = state.price !== undefined && state.price !== "" && state.price.length <= 1 
                ? 'First name must be greater than 1 character' : '';
                
            case state.deposit !== undefined:
                // create a good RegExp for this
                errors.deposit = state.deposit !== undefined && state.deposit !== "" && state.deposit.length <= 1 
                ? 'First name must be greater than 1 character' : '';
                
            default:
                break;
        }

        setErrorsState(errors);
    };
