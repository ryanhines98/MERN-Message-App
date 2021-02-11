import { createSocket }  from "./socket";
import axios from "axios";
import { 
    ESTABLISH_SOCKET,
    DESTABLISH_SOCKET,
    SET_CURRENT_CONTACT,
    SET_MESSAGES
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

    if( !(Object.keys(contact).length === 0) ) {
        dispatch(getMessages(contact.conversation));
    } else {
        dispatch({
            type: SET_MESSAGES,
            payload: {}
        });
    }

    dispatch({
        type: SET_CURRENT_CONTACT,
        payload: contact
    });
}

export const getMessages = (convo_id) =>  async (dispatch) => {
    const msgs = await axios
        .get('/api/users/messages', { params: { convo_id } })
        .catch((err) => console.log(err));

    dispatch({
        type: SET_MESSAGES,
        payload: msgs.data
    });
}
