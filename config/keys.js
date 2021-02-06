/*
    holds the keys used in other files
*/

module.exports = {
    // uri needed to connect to the MongoDB
    mongoURI: "mongodb+srv://admin:7913@cluster0.f9rj7.mongodb.net/MERN?retryWrites=true&w=majority",
    // private key for the decoding of requests
    secretOrKey: "secret",

    serverPort: process.env.PORT || 5000,
    serverAddr: "http://localhost",
    clientPort: process.env.PORT || 3000,
    clientAddr: "http://localhost:3000"
};