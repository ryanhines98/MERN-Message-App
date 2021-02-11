const db = require("./config/db");
const middleware = require("./config/middleware");
const path = require('path');
const express = require('express');
const submitMessage = require('./utils/messaging').submitMessage;

// routes
const users = require("./routes/api/users");

const clientAddr = ( (process.env.NODE_ENV === 'production') ? 'https://polar-lake-08328.herokuapp.com/' : 'http://localhost:3000');
const port = process.env.PORT || 5000;

const app = require("express")();
const server = app.listen(port, () => console.log(`Server up and running on port ${port}!`) );
app.io = require("socket.io")(server, {
    cors: {
       origin: clientAddr,
       methods: ["GET", "POST"]
    }
});

// apply middleware and connect to database
middleware.apply(app);
db.connectDB();

// map to keep track of users connected by socket
var clients = new Map();

app.io.on("connection", (socket) => {
    console.log(socket.id + " connected");


    socket.on('storeClientInfo', (data) => {
        if(!clients.has(data.userid)) {
            clients.set(data.userid, socket.id)
        } else {
            socket.disconnect();
        }
    });

    socket.on('message', (receiverid, msg) => {
        submitMessage(msg);
        socket.to(clients.get(receiverid)).emit('message', msg);
    });

    socket.on("disconnect", () => {
        console.log(socket.id + " disconnected");
        for(let [key, value] of clients) {
            if(value === socket.id) {
                clients.delete(key);
            }
        }
    });
});


// apply routes
app.use( "/api/users", users(app.io) );

// serve static assets while in production
if(process.env.NODE_ENV === 'production') {
    // static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}