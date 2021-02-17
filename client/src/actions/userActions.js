import axios from "axios";
import { GET_ERRORS, UPDATE_CONTACTS } from "./types";
import { logoutUser } from "./authActions";
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

export const addContact = (email) => (dispatch, getState) => {
    // create new contacts array to update redux store
    const contacts = [].concat(getState().auth.user.contacts);

    // pass chosen contact email 
    axios
        .post('api/users/contact', { email })
        .then((res) => {
            // push added contact to new contacts array
            contacts.push(res.data);
            // then dispatch the contacts to redux store
            dispatch(updateContacts(contacts));
            // update session contacts
            sessionStorage.setItem('contacts', JSON.stringify(contacts));
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

export const deleteAccount = () => dispatch => {
    axios
        .delete('api/users/account')
        .then(res => {
            console.log(res);
            dispatch(logoutUser());
        })
        .catch(err => {
            console.log(err);
        });
}