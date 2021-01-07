import { GET_ERRORS } from "../actions/types";

const initialState = {};

export default function errorReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ERRORS:
            // set state to the payload
            return action.payload;
        default:
            return state;
    }
}