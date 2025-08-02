module.exports.config = {
  name: "voiceDetect",
  version: "1.1.0",
  hasPermssion: 0,
  credits: "Modified by ChatGPT",
  description: "Replies /uns when a specific user sends a voice message",
  commandCategory: "system",
  usages: "Automatic",
  cooldowns: 0,
};

module.exports.handleEvent = async ({ api, event }) => {
  const targetUID = "61567287934615"; // 🟢 এখানে তোমার টার্গেট ইউজারের UID

  // ✅ Step 1: Check if message is from target user and has attachments
  if (event.senderID !== targetUID) return;
  if (!event.attachments || event.attachments.length === 0) return;

  // ✅ Step 2: Check for voice/audio attachments
  const isVoiceMessage = event.attachments.some(att => {
    const mime = att.mimeType || "";
    return (
      att.type === "audio" ||                             // Standard audio type
      (att.type === "file" && mime.includes("audio"))     // Voice files like m4a, mp3, etc.
    );
  });

  if (!isVoiceMessage) return;

  // ✅ Step 3: Log & reply
  console.log("[voiceDetect] Voice message detected from target user.");

  return api.sendMessage(
    {
      body: "/uns",
      replyToMessageID: event.messageID
    },
    event.threadID,
    (err) => {
      if (err) return console.error("[voiceDetect] Failed to send /uns:", err);
      console.log("[voiceDetect] Sent /uns successfully.");
    }
  );
};

module.exports.run = () => {
  // This module is event-based; no need to run manually.
  return;
};
