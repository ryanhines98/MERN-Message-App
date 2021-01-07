const mongoose = require("mongoose");

function connectDB() {
    // db URI for connection
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
};

module.exports = { connectDB };