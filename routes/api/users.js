const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const keys = require("../../config/keys");
const passport = require('passport');

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const emailValidation = require("../../validation/email");
const generateToken = require('../../validation/token');

// Load User model
const User = require("../../models/User");
const Conversation = require("../../models/Conversation");
const Message = require("../../models/Message");

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
                        email: user.email,
                        contacts: []
                    };

                    const token = generateToken(payload);
                    return res.json({
                        success: true,
                        token: "Bearer " + token
                    });
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

            // ------ CONTACT VERIFICATION CHECKS ------ //

            // check if the requested contact isn't the current user
            if(email === req.user.email) {
                return res.status(400).json({ addcontacterror: 'Cannot add yourself'})
            }

            // check if the requested contact exists in the database
            const contact = await User.findOne({ email }, 'name');
            if(!contact) return res.status(404).json({ addcontacterror: 'User not found' });

            // check if the requested user isn't already a contact
            const user = await User.findById(req.user._id, 'contacts');
            for(let e of user.contacts) {
                const contactStr = JSON.stringify(contact._id);
                if(JSON.stringify(e._id) === contactStr) return res.status(400).json({ addcontacterror: 'User already in contacts' });
            };



            // ------ CONVERSATION CREATION BETWEEN CONTACTS ------ //

            // see if conversation with two user exists
            var convo = null;
            const members = [ contact._id, req.user._id ].sort();

            convo = await Conversation
                .findOne({ members: members })
                .then((res) => {
                    return res;
                })
                .catch(err => console.log(err));
            
            // if no current conversation, then add a new one to database
            if(!convo) {
                const newConvo = new Conversation({
                    members: members
                });

                convo = await newConvo
                    .save()
                    .then((res) => {
                        return res;
                    })
                    .catch(err => console.log(err));
            }
            
            const newContact = {
                ...contact._doc,
                conversation: convo._id
            }

            // update User's contact list in database
            await User.updateOne({ _id: req.user._id },{$push: {contacts: newContact}})
                .then(() => res.json(newContact));

        } catch(err) {
            return res.status(500).json({ servererror: 'Internal server error.' });
        }
    });


    // @route GET api/users/contacts
    // @desc Get a user's contacts
    // @access private
    router.get('/contacts', passport.authenticate('jwt', {session: false}), async (req, res) => {
        try {
            const user = await User.findById(req.user._id, 'contacts');
            return res.json(user.contacts);
        } catch(err) {
            return res.status(500).json({ servererror: 'Internal server error.'});
        }
    });


    // @route DELETE api/users/contact
    // @desc Delete a contact from a user's list in database
    // @access private
    router.delete('/contact', passport.authenticate('jwt', {session: false}), async (req, res) => {
        try {
            // delete contact from user's contacts array
            await User.updateOne( { _id: req.user._id }, { $pullAll: { contacts: [ { _id: req.body._id, name: req.body.name, conversation: req.body.conversation } ] } } )
                .then(async () => {
                    // check if requested contact has current user as a contact
                    const query = await User.findById(req.body._id, 'contacts');
                    for(let e of query.contacts) {
                        if(JSON.stringify(e._id) === JSON.stringify(req.user._id)) {
                            // if so then return
                            return res.json({ success: true});
                        }
                    }

                    //console.log(typeof req.body.conversation);

                    // if not, then delete messages history and conversation
                    Message.deleteMany({ conversation: req.body.conversation });

                    Conversation.findByIdAndDelete(req.body.conversation)
                        .then(() => res.json({ success: true }));
                })
                .catch(err => console.log(err));

        } catch(err) {
            return res.status(500).json({ servererror: 'Internal server error.'});
        }
    });







    // @route DELETE api/users/account
    // @desc Delete User Account from Database
    // @access private
    router.delete('/account', passport.authenticate('jwt', {session: false}), async (req, res) => {
        try {
            await User.findByIdAndDelete(req.user._id)
                .then(() => {
                    return res.json({ success: true });
                })
                .catch(err => console.log(err));
        } catch(err) {
            return res.status(500).json({ servererror: 'Internal server error.'});
        }
    });

    // @route PUT api/users/email
    // @desc Update User Email
    // @access private
    router.put('/email', passport.authenticate('jwt', {session: false}), async (req, res) => {
        try {
            const {email} = req.body
            const errors = emailValidation(email);
            
            // ----- EMAIL VALIDATION ----- //

            // check if email is formatted correctly
            if( Object.keys(errors).length > 0 )
                return res.status(400).json(errors);

            // check it is not the user's current email
            if( req.user.email === email)
                return res.status(400).json({ email: 'Already your email' });
            
            // check if email is already registered under another user
            await User
                .findOne({ email: email })
                .then( user => {
                    if(user)
                        return res.status(400).json({ email: 'Email is currently registered' });
                });
            
            // update user's email
            await User
                .updateOne({ _id: req.user._id }, {$set: { email: email }});

            await User
                .findById(req.user._id)
                .then((user) => {
                    //construct payload for new token
                    const payload = {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        contacts: []
                    }

                    const token = generateToken(payload);

                    res.json({ 
                        success: true,
                        token: "Bearer " + token
                    });
                });

        } catch(err) {
            return res.status(500).json({ servererror: 'Internal server error.'});
        }
    });






    // @route GET api/users/messages
    // @desc Get messages based on conversation from Database
    // @access private
    router.get('/messages', passport.authenticate('jwt', {session: false}), async (req, res) => {
        try {
            await Message
                .find({ conversation: req.query.convo_id })
                .sort({ timestamp: -1 })
                .limit(10)
                .then((query) => {
                    res.json(query);
                })
                .catch((err) => console.log(err));
            
        } catch(err) {
            return res.status(500).json({ servererror: 'Internal server error.'});
        }
    });

    return router;
}