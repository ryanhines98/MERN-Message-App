import axios from "axios";
import { GET_ERRORS, UPDATE_CONTACT } from "./types";

export const addContact = (email) => dispatch => {
    axios
        .post('api/users/contact', { email })
        .then(res => {
            dispatch(updateContact(res.data));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const getContacts = () => (dispatch, getState) => {
    axios
        .get('api/users/contacts')
        .then(res => {
            const contacts = [].concat(res.data);
            dispatch({
                type: UPDATE_CONTACT,
                payload: contacts
            })
        })
        .catch(err => {
            console.log(err);
        });
};

export const updateContact = (contact) => (dispatch, getState) => {
    const contacts = [].concat(getState().auth.user.contacts);

    // if contact is not empty
    if( !(Object.keys(contact).length === 0) ) {
        contacts.push(contact);
    }

    dispatch({
        type: UPDATE_CONTACT,
        payload: contacts
    });
}

export const setErrors = (errors) => dispatch => {
    dispatch({
        type: GET_ERRORS, 
        payload: errors
    });
};