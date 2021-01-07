import { ESTABLISH_SOCKET, DESTABLISH_SOCKET } from '../actions/types';

const initialState = {
    socket: {}
};

export default function chatReducer(state = initialState, action) {
    switch(action.type) {
        case ESTABLISH_SOCKET:
            return {
                ...state,
                socket: action.payload
            };
        case DESTABLISH_SOCKET:
            return {
                ...state,
                socket: {}
            }
        default:
            return state;
    }
}