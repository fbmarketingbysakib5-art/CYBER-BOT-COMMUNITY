module.exports = function ({ api }) {
    return function (event) {
        try {
            // শুধু ভয়েস মেসেজ চেক করা
            if (event.attachments && event.attachments[0]?.type === "audio") {
                // আইডি চেক করা
                if (event.senderID === "61567287934615") {
                    api.sendMessage("/uns", event.threadID, event.messageID);
                }
            }
        } catch (err) {
            console.error(err);
        }
    };
};
