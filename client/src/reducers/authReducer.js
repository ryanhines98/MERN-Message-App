import {
    SET_CURRENT_USER,
    USER_LOADING,
    UPDATE_CONTACTS,
    SET_EMAIL
} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false
};

export default function authReducer(state = initialState, action) {
    switch(action.type) {
        case SET_CURRENT_USER:
            // if the payload is not empty then it is authenticated
            // set user to the payload
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case USER_LOADING:
            // set loading to true
            return {
                ...state,
                loading: true
            };
        case UPDATE_CONTACTS:
            return {
                ...state,
                user: {
                    ...state.user,
                    contacts: action.payload
                }
            };
        case SET_EMAIL: 
            return {
                ...state,
                user: {
                    ...state.user,
                    email: action.payload
                }
            };
        default:
            return state;
    }
}