const Message = require('../models/Message');

const submitMessage = async (msg) => {

    const newMsg = new Message({
        ...msg
    });

    await newMsg
        .save()
        .catch((err) => console.log(err));
};

module.exports.submitMessage = submitMessage;