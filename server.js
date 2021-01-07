const db = require("./config/db");
const middleware = require("./config/middleware");

// routes
const users = require("./routes/api/users");

const app = require("express")();
const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`Server up and running on port ${port}!`) );
const serverAddr = require("./config/keys").serverAddr;
app.io = require("socket.io")(server, {
    cors: {
        origin: serverAddr,
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

            console.log('Clients: ');
            console.log(clients);
        } else {
            socket.disconnect();
        }
    });

    socket.on('message', (data) => {
        socket.broadcast.emit('message', data);
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