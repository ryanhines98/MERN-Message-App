import { io } from 'socket.io-client';
import { 
    ESTABLISH_SOCKET,
    DESTABLISH_SOCKET
} from './types';

const SERVER_URL = 'http://localhost:5000'; 

export const connectSocket = () => (dispatch, getState) => {
    if(getState().auth.isAuthenticated) {
        dispatch({
            type: ESTABLISH_SOCKET,
            payload: io(SERVER_URL)
        })
    } 
}

export const disconnectSocket = () => (dispatch, getState) => {
    getState().chat.socket.disconnect();
    dispatch({
        type: DESTABLISH_SOCKET
    })
}
