const Message = require('../models/Message');

const submitMessage = async (msg) => {

    console.log('=============================');
    console.log(msg);
    console.log('=============================');

    const newMsg = new Message({
        ...msg
    });

    await newMsg
        .save()
        .catch((err) => console.log(err));
};

module.exports.submitMessage = submitMessage;