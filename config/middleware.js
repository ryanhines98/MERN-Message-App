const bodyParser = require("body-parser");
const passport = require("passport");

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
}

module.exports = { apply };