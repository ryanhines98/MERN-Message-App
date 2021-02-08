const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

function apply(app) {
    // apply bodyParser middleware
    app.use(
        bodyParser.urlencoded({
            extended: false
        }),
        bodyParser.json()
    );

    //passport middleware
    app.use(passport.initialize());
    //passport config function
    require("./passport")(passport);
    
    if(process.env.CORS) {
        // cors middleware
        app.use(cors());
    }
}

module.exports = { apply };