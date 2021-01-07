import { io } from 'socket.io-client';
import { addEvents }  from "./events";
import { 
    ESTABLISH_SOCKET,
    DESTABLISH_SOCKET
} from './types';

const SERVER_URL = 'http://localhost:5000'; 

export const connectSocket = () => (dispatch, getState) => {
    if(getState().auth.isAuthenticated) {

        var socket = io(SERVER_URL);
        addEvents(socket);

        dispatch({
            type: ESTABLISH_SOCKET,
            payload: socket
        })
    } 
}

export const disconnectSocket = () => (dispatch, getState) => {
    getState().chat.socket.disconnect();
    dispatch({
        type: DESTABLISH_SOCKET
    })
}
