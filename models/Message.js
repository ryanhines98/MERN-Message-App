const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    conversation: { 
        type: Schema.Types.ObjectId, 
        ref: 'conversations',
        required: true 
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    text: {
        type: String,
        required: true
    }
});

module.exports = Conversation = mongoose.model('messages', MessageSchema);