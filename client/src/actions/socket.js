import { io } from 'socket.io-client';

const SERVER_URL = 'http://localhost:5000'; 

export function createSocket() {
    var socket = io(SERVER_URL);
    addEvents(socket);
    return socket;
}

export function addEvents(socket) {
    socket.on('connect', function(data){
        console.log('connection established');
    });
};