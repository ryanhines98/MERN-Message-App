import axios from "axios";
import { GET_ERRORS } from "./types";

export const addContact = (email) => dispatch => {
    axios
        .post('api/users/contacts', { email })
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const clearErrors = () => dispatch => {
    dispatch({
        type: GET_ERRORS, 
        payload: {}
    });
};