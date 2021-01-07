import { createSocket }  from "./socket";
import { 
    ESTABLISH_SOCKET,
    DESTABLISH_SOCKET
} from './types';

export const connectSocket = () => (dispatch, getState) => {
    if(getState().auth.isAuthenticated) {

        dispatch({
            type: ESTABLISH_SOCKET,
            payload: createSocket()
        })
    } 
}

export const disconnectSocket = () => (dispatch, getState) => {
    getState().chat.socket.disconnect();
    dispatch({
        type: DESTABLISH_SOCKET
    })
}
