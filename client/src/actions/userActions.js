import axios from "axios";
import { GET_ERRORS } from "./types";

export const addContact = (email) => {
    
    let errors = axios
        .post('api/users/contacts', { email })
        .then(res => {
            console.log(res.data);
            return false;
        })
        .catch(err => {
            return err.response.data;
        });
    return errors;
};

export const setErrors = (errors) => dispatch => {
    dispatch({
        type: GET_ERRORS, 
        payload: errors
    });
};