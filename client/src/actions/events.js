
export function addEvents(socket) {
    socket.on('connect', function(data){
        console.log('connection established');
    });
};