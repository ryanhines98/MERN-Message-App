const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require('passport');

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
                        name: user.name,
                        contacts: []
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


    // @route POST api/users/contact
    // @desc Add to a User's contacts in the Database and Return Contact information
    // @access private
    router.post('/contact', passport.authenticate('jwt', {session: false}), async (req, res) => {
        const { email } = req.body;

        try {

            // check if the requested contact is the current user
            if(email === req.user.email) {
                return res.status(400).json({ addcontacterror: 'Cannot add yourself'})
            }

            // check if the requested contact exists in the database
            const contact = await User.findOne({ email }, 'name');
            if(!contact) return res.status(404).json({ addcontacterror: 'User not found' });

            console.log('Requested Contact: ');
            console.log(contact);

            // check if the requested user isn't already a contact
            const user = await User.findById(req.user._id, 'contacts');
            for(let e of user.contacts) {
                const contactStr = JSON.stringify(contact._id);
                if(JSON.stringify(e._id) === contactStr) {
                    console.log('matching contacts');
                    return res.status(400).json({ addcontacterror: 'User already in contacts' });
                }
            };

            // update User's contact list in database
            await User.updateOne({ _id: req.user._id },{$push: {contacts: contact}})
            .then(() => {
                return res.json(contact);
            });

        } catch(err) {
            return res.status(500).json({ servererror: 'Internal server error.' });
        }
    });


    // @route POST api/users/contacts
    // @desc Add to a User's contacts in the Database and Return Contact information
    // @access private
    router.get('/contacts', passport.authenticate('jwt', {session: false}), async (req, res) => {
        try {
            const user = await User.findById(req.user._id, 'contacts');
            return res.json(user.contacts);
        } catch(err) {
            return res.status(500).json({ servererror: 'Internal server error.'});
        }
    });

    return router;
}