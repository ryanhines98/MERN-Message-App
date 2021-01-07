const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    contacts: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'users'
        }],
        default: []
    }
});

module.exports = User = mongoose.model("users", UserSchema);