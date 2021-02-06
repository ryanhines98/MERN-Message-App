const db = require("./config/db");
const middleware = require("./config/middleware");
const path = require('path');
const express = require('express');

// routes
const users = require("./routes/api/users");

const app = require("express")();
const port = require("./config/keys").serverPort;
const server = app.listen(port, () => console.log(`Server up and running on port ${port}!`) );
const clientAddr = require("./config/keys").clientAddr;
app.io = require("socket.io")(server, {
    cors: {
        origin: window.location.origin,
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


    socket.on('message', (userid, msg) => {
        socket.to(clients.get(userid)).emit('message', msg);
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