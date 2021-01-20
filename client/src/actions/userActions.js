import axios from "axios";
import { GET_ERRORS, UPDATE_CONTACT } from "./types";

export const addContact = (email) => dispatch => {
    axios
        .post('api/users/contact', { email })
        .then(res => {
            console.log(res.data);
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
    const user = getState().auth.user;

    axios
        .get('api/users/contacts')
        .then(res => {
            user.contacts = res.data;
            dispatch({
                type: UPDATE_CONTACT,
                payload: user
            })
        })
        .catch(err => {
            console.log(err);
        });
};

export const updateContact = (contact) => (dispatch, getState) => {
    var user = getState().auth.user;
    console.log(contact);

    // if contact is not empty
    if( !(Object.keys(contact).length === 0) ) {
        user.contacts.push(contact);
    }

    dispatch({
        type: UPDATE_CONTACT,
        payload: user
    });
}

export const setErrors = (errors) => dispatch => {
    dispatch({
        type: GET_ERRORS, 
        payload: errors
    });
};