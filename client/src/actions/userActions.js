import axios from "axios";
import { GET_ERRORS, UPDATE_CONTACTS, SET_EMAIL } from "./types";
import { logoutUser, applyToken } from "./authActions";
import { setCurrentContact } from "./chatActions";

export const updateContacts = (contacts) => (dispatch) => {
    dispatch({
        type: UPDATE_CONTACTS,
        payload: contacts
    });
}

export const getContacts = () => async (dispatch) => {
    if(sessionStorage.contacts) {
        dispatch({
            type: UPDATE_CONTACTS,
            payload: JSON.parse(sessionStorage.contacts)
        });
    } else {
        const sessionContacts = await axios
            .get('api/users/contacts')
            .then(res => {
                const contacts = [].concat(res.data);
                dispatch({
                    type: UPDATE_CONTACTS,
                    payload: contacts
                });
                return contacts;
            })
            .catch(err => {
                console.log(err);
            });
        
        sessionStorage.setItem('contacts', JSON.stringify(sessionContacts));
    }
};

export const addContact = (email, setAlert) => async (dispatch, getState) => {
    // create new contacts array to update redux store
    const contacts = [].concat(getState().auth.user.contacts);

    // pass chosen contact email 
    await axios
        .post('api/users/contact', { email })
        .then((res) => {
            // push added contact to new contacts array
            contacts.push(res.data);
            // then dispatch the contacts to redux store
            dispatch(updateContacts(contacts));
            // update session contacts
            sessionStorage.setItem('contacts', JSON.stringify(contacts));

            // display alert that adding contact was successful
            setAlert();
        })
        .catch(err => {
            dispatch(setErrors(err.response.data));
        });
};

export const deleteContact = (contact) => (dispatch, getState) => {

    // create new contacts array to update redux store
    const contacts = [].concat(getState().auth.user.contacts);

    // check if passed contact is not empty
    // then find and remove the chosen contact from the array
    if( !(Object.keys(contact).length === 0) ) {
        for(let i =0; i < contacts.length; i++) {
            if( contacts[i] === contact ) contacts.splice(i, 1);
        }
    }

    // pass chosen contact to database to remove
    axios
        .delete('api/users/contact', { data: contact } )
        .then(() => {
            // update redux state for user's contacts
            dispatch(updateContacts(contacts));

            // if the chosen contact is the current contact,
            // then set current contact to empty and remove from session storage
            if( getState().chat.currentContact._id === contact._id ) {
                dispatch(setCurrentContact({}));
                sessionStorage.removeItem('contact');
            }

            // update session storage contacts
            sessionStorage.setItem('contacts', JSON.stringify(contacts));
        })
        .catch(err => {
            console.log(err);
        });
}

export const setErrors = (errors) => dispatch => {
    dispatch({
        type: GET_ERRORS, 
        payload: errors
    });
};


// ------- ACCOUNT PAGE ACTIONS ------- //

// delete account
export const deleteAccount = () => async dispatch => {
    await axios
        .delete('api/users/account')
        .then(res => {
            console.log(res);
            dispatch(logoutUser());
        })
        .catch(err => {
            console.log(err);
        });
}

// change email and update to database
export const updateEmail = email => async (dispatch, getState) => {

    const { errors } = getState();

    await axios
        .put('api/users/email', { email } )
        .then((res) => {
           
            // get regenerated token to set for browser
            dispatch(applyToken(res.data.token));

            // change redux store
            dispatch({
                type: SET_EMAIL,
                payload: email
            });


            if( Object.keys(errors).length > 0)
                dispatch(setErrors({}));
        })
        .catch( err => dispatch(setErrors(err.response.data)) );
}