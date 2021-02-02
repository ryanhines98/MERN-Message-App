import { io } from 'socket.io-client';
import store from '../store';

const SERVER_URL = 'http://localhost:5000'; 

export function createSocket() {
    console.log(window.location.host);
    var socket = io(
        SERVER_URL,
        { secure: true }
    );
    addEvents(socket);
    return socket;
}

export function addEvents(socket) {
    socket.on('connect', function(data){
        const state = store.getState();
        socket.emit('storeClientInfo', { userid:  state.auth.user.id });
        // console.log('Socket Connected!');
    });
};