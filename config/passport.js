/*
Description:
  initialization function for the passport middleware. given a JwtStrategy object
  using options for configuration and a function definition to execute when a request
  is received
*/

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");

// configuration options for how token is extracted
const opts = {};
// 'secretOrKey' is required for verifying token's signature
//     - secret is taken from keys.js under config directory
opts.secretOrKey = keys.secretOrKey;
// 'jwtFromRequest' is required and is a function which accepts a request and returns
//  either a JWT as a string or null
//     - 'fromAuthHeaderAsBearerToken' is an extractor that looks for the JWT 
//        in the Authorization header with scheme 'bearer'
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); 


module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, 
      // verify function
      (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            })
            .catch(err => console.log(err));
    })
  );
};