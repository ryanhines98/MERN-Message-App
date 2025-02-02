import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING,
    SET_MESSAGES
} from "./types";

import { setCurrentContact } from "./chatActions";

// register user
export const registerUser = (userData, history) => dispatch => {
    axios
        .post("api/users/register", userData)
        .then(res => history.push("/login"))    //redirect to log-in on success
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Login - get user token
export const loginUser = userData => dispatch => {
    axios
        .post("/api/users/login", userData)
        .then(res => {
            dispatch(applyToken(res.data.token));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from local storage, 
    // remove header for future requests, 
    // setCurrentUser to empty -> makes authenticted to false
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}));

    // Remove contact from session storage,
    // set currentContact to empty
    // sessionStorage.removeItem('contact');
    dispatch(setCurrentContact({}));

    sessionStorage.clear();

    // Clear Messages
    dispatch({
        type: SET_MESSAGES,
        payload: null
    });
};


export const applyToken = (token) => dispatch => {
    // Set token to localStorage
    localStorage.setItem("jwtToken", token);

    // Set token to Auth header
    setAuthToken(token);

    // Decode token to get user data
    const decoded = jwt_decode(token);

    // Set current user
    dispatch(setCurrentUser(decoded));
};