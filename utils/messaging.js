const Message = require('../models/Message');

const submitMessage = async (msg) => {
    const newMsg = new Message({
        ...msg
    });

    await newMsg
        .save()
        .then((res) => {
            console.log(res);
        })
        .catch((err) => console.log(err));
};

module.exports.submitMessage = submitMessage;