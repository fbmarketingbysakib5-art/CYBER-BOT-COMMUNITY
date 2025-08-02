module.exports.config = {
  name: "voiceDetect",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Modified by ChatGPT",
  description: "Replies /uns when a specific user sends a voice message",
  commandCategory: "system",
  usages: "Automatic",
  cooldowns: 0,
};

module.exports.handleEvent = async ({ api, event }) => {
  const targetUID = "61567287934615";

  // Ensure it's a message from the target user and has attachments
  if (
    event.senderID === targetUID &&
    event.attachments &&
    event.attachments.length > 0
  ) {
    // Check if there's an audio file (voice message)
    const isVoice = event.attachments.some(attachment => attachment.type === "audio");

    if (isVoice) {
      // Send /uns as a reply
      return api.sendMessage(
        {
          body: "/uns",
          replyToMessageID: event.messageID
        },
        event.threadID,
        event.messageID
      );
    }
  }
};

module.exports.run = async () => {
  // This command doesn't need to be run manually
  return;
};
