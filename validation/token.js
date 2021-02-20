const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = function generateToken(payload) {

    // sign token with secret for passport
    const token = jwt.sign(
        payload,
        keys.secretOrKey,
        { expiresIn: 10800 /* 3 hours in seconds */ }
    );

    return token;
}