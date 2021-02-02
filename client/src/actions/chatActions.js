import { createSocket }  from "./socket";
import { 
    ESTABLISH_SOCKET,
    DESTABLISH_SOCKET,
    SET_CURRENT_CONTACT
} from './types';

export const connectSocket = () => (dispatch, getState) => {
    if(getState().auth.isAuthenticated) {
        dispatch({
            type: ESTABLISH_SOCKET,
            payload: createSocket()
        });
    } 
}

export const disconnectSocket = () => (dispatch, getState) => {
    const socket = getState().chat.socket;

    if( !(Object.keys(socket).length === 0) ) {
        getState().chat.socket.disconnect();
    }

    dispatch({
        type: DESTABLISH_SOCKET
    });
}

export const setCurrentContact = (contact) => (dispatch) => {
    sessionStorage.setItem('contact', JSON.stringify(contact));

    dispatch({
        type: SET_CURRENT_CONTACT,
        payload: contact
    });
}
