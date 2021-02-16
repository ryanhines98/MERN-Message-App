import axios from "axios";
import { GET_ERRORS, UPDATE_CONTACT } from "./types";
import { logoutUser } from "./authActions";
import { setCurrentContact } from "./chatActions";

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

export const getContacts = () => async (dispatch) => {
    await axios
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

export const deleteContact = (contact) => (dispatch, getState) => {

    const contacts = [].concat(getState().auth.user.contacts);

    if( !(Object.keys(contact).length === 0) ) {
        for(let i =0; i < contacts.length; i++) {
            if( contacts[i] === contact ) contacts.splice(i, 1);
        }
    }

    if( getState().chat.currentContact._id === contact._id ) {
        dispatch(setCurrentContact({}));
        sessionStorage.removeItem('contact');
    }

    axios
        .delete('api/users/contact', { data: contact } )
        .then(() => {
            dispatch({
                type: UPDATE_CONTACT,
                payload: contacts
            });
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