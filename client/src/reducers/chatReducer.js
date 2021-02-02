import { 
    ESTABLISH_SOCKET, 
    DESTABLISH_SOCKET,
    SET_CURRENT_CONTACT
} from '../actions/types';

const initialState = {
    socket: {},
    currentContact: {}
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
        default:
            return state;
    }
}