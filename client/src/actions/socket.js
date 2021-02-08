import { io } from 'socket.io-client';
import store from '../store';

const SERVER_URL = 'http://localhost:5000'; 
//const SERVER = require('../config/config');

export function createSocket() {
    var socket = io(
        window.location.origin,
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