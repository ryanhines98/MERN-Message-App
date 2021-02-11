import { 
    ESTABLISH_SOCKET, 
    DESTABLISH_SOCKET,
    SET_CURRENT_CONTACT,
    SET_MESSAGES
} from '../actions/types';

const initialState = {
    socket: {},
    currentContact: {},
    messages: {}
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
            };
        case SET_CURRENT_CONTACT:
            return {
                ...state,
                currentContact: action.payload
            };
        case SET_MESSAGES:
            return {
                ...state,
                messages: action.payload
            }
        default:
            return state;
    }
}