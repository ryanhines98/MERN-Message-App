import axios from "axios";
import { GET_ERRORS, UPDATE_CONTACT } from "./types";

export const addContact = (email) => dispatch => {
    axios
        .post('api/users/contacts', { email })
        .then(res => {
            // console.log(res.data);
            updateContact(res.data);
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const updateContact = (contact) => (dispatch, getState) => {
    var user = getState().auth.user;
    if( !(Object.keys(user).length === 0) )
        user.contacts.push(contact);
    console.log(user);
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