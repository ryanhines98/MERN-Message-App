/*
Description: 
    main script for the server that creates the express server, 
    applies middleware, connects to the MongoDB, sets the routes, 
    establishes port number, and calls the config function

    Middleware:
        bodyparser [ used to parse requests ]
        passport [ authentication middleware ]
*/

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");

const app = require("express")();

const port = process.env.PORT || 5000;  // proccess.env.PORT is for Heroku
const serverAddr = require("./config/keys").serverAddr;
const server = app.listen(port, () => console.log(`Server up and running on port ${port}!`) );
app.io = require("socket.io")(server, {
    cors: {
        origin: serverAddr,
        methods: ["GET", "POST"]
    }
});

// apply bodyParser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    }),
    bodyParser.json()
);

// db config
const db = require("./config/keys").mongoURI;


// connect to mongoDB
mongoose.connect(
    db,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true 
    }
)
.then( () => console.log("MongoDB successfully connected"))
.catch( err => console.log(err) );


//passport middleware
app.use(passport.initialize());
//passport config function
require("./config/passport")(passport);

app.io.on("connection", (socket) => {
    console.log(socket.id + " has connected");

    socket.on("disconnect", () => {
        console.log(socket.id + " has disconnected");
    });
});


// apply routes
app.use( "/api/users", users(app.io) );