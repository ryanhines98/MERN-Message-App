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
            _id: {
                type: Schema.Types.ObjectId,
                ref: 'users',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            conversation: {
                type: Schema.Types.ObjectId,
                ref: 'conversations',
                required: true
            }
        }],
        default: []
    }
});

module.exports = User = mongoose.model("users", UserSchema);