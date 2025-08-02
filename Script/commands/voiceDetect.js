module.exports.config = {
  name: "voiceDetect",
  version: "1.2.0",
  hasPermssion: 0,
  credits: "Modified by ChatGPT",
  description: "Replies /uns when a specific user sends a voice message",
  commandCategory: "system",
  usages: "Automatic",
  cooldowns: 0,
};

module.exports.handleEvent = async ({ api, event }) => {
  const targetUID = "61567287934615"; // ✅ Change this if needed

  // 🔍 Step 1: Log everything for debugging
  console.log("[voiceDetect] Incoming event:");
  console.log("SenderID:", event.senderID);
  console.log("ThreadID:", event.threadID);
  console.log("Attachments:", event.attachments);

  // ✅ Step 2: Check if message is from the target user
  if (event.senderID !== targetUID) {
    console.log("[voiceDetect] Not from target user. Ignored.");
    return;
  }

  // ✅ Step 3: Check if there are attachments
  if (!event.attachments || event.attachments.length === 0) {
    console.log("[voiceDetect] No attachments found. Ignored.");
    return;
  }

  // ✅ Step 4: Check if it's a voice message (audio/file with audio mimetype)
  const isVoiceMessage = event.attachments.some(att => {
    const mime = att.mimeType || "";
    const result = (
      att.type === "audio" ||
      (att.type === "file" && mime.includes("audio"))
    );
    if (result) {
      console.log("[voiceDetect] Voice message detected:", att);
    }
    return result;
  });

  if (!isVoiceMessage) {
    console.log("[voiceDetect] Not a voice message. Ignored.");
    return;
  }

  // ✅ Step 5: Reply with /uns
  console.log("[voiceDetect] Sending /uns reply...");
  api.sendMessage(
    {
      body: "/uns",
      replyToMessageID: event.messageID
    },
    event.threadID,
    (err) => {
      if (err) {
        console.error("[voiceDetect] Failed to send /uns:", err);
      } else {
        console.log("[voiceDetect] /uns sent successfully.");
      }
    }
  );
};

module.exports.run = () => {
  return;
};
