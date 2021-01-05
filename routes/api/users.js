const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

module.exports = function(io) { 

    // @route POST api/users/register
    // @desc Register user
    // @access Public
    router.post("/register", (req, res) => {
        // get form validation information
        const { errors, isValid } = validateRegisterInput(req.body);

        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        // find the user from the User table ind database
        User.findOne({ email: req.body.email }).then( user => {
            // if a user already exists then report error
            if (user) {
                return res.status(400).json({ email: "Email already exists" });
            } 
            // else, create a user object and submit to database
            else { 
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });

                // hash password before saving in database
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    });


    // @route POST api/users/login
    // @desc Login user and return JWT Token
    // @access public
    router.post("/login", (req, res) => {
        //Form Validation
        const { errors, isValid } = validateLoginInput(req.body);

        //check validation
        if(!isValid) {
            return res.status(400).json(errors);
        }

        const email = req.body.email;
        const password = req.body.password;

        //find user by email
        User.findOne({ email }).then(user => {
            //check if user exists
            if(!user) {
                return res.status(404).json({ emailnotfound: "Email not found" });
            }

            //check password
            bcrypt.compare(password, user.password).then(isMatch => {

                // User Matches
                if(isMatch) {
                    // create JWT payload
                    const payload = {
                        id: user.id,
                        name: user.name
                    };

                    // sign token
                    // include secret for passport
                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        {
                            expiresIn: 10800 // 3 hours in seconds
                        },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token // put bearer in front for passport
                            });
                        }
                    );
                } 
                // else return error
                else {
                    return res
                        .status(400)
                        .json({ passwordincorrect: "Password incorrect" });
                }
            });
        });
    });

    return router;
}