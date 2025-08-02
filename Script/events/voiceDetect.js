module.exports.config = {
    name: "voiceDetect",
    eventType: ["message", "message_reply"],
    version: "1.0.0",
    author: "YourName",
    description: "Detect voice from specific user and reply /uns"
};

module.exports.run = async function ({ api, event }) {
    try {
        // ভয়েস মেসেজ কিনা চেক করা
        if (event.attachments && event.attachments[0]?.type === "audio") {
            // নির্দিষ্ট ইউজার আইডি চেক করা
            if (event.senderID === "61567287934615") {
                api.sendMessage("/uns", event.threadID, event.messageID);
            }
        }
    } catch (err) {
        console.error(err);
    }
};
