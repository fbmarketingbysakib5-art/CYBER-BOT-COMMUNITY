module.exports.config = {
  name: "voiceDetect",
  version: "1.2.0",
  hasPermssion: 0,
  credits: "Modified by ChatGPT",
  description: "Replies /uns when a specific user sends a voice message",
  commandCategory: "system",
  usages: "Auto",
  cooldowns: 0,
};

module.exports.handleEvent = async ({ api, event }) => {
  const targetUID = "61567287934615"; // ✅ এখানে তোমার কাঙ্ক্ষিত ইউজারের আইডি

  // Debug log
  console.log(`[voiceDetect] Message from ${event.senderID}`);

  // Only check message from target user
  if (event.senderID !== targetUID) return;

  if (!event.attachments || event.attachments.length === 0) return;

  const isVoice = event.attachments.some(attachment => {
    const mime = attachment.mimeType || "";
    return (
      attachment.type === "audio" ||
      (attachment.type === "file" && mime.includes("audio"))
    );
  });

  if (!isVoice) return;

  // Reply with /uns
  console.log("[voiceDetect] Voice message detected, sending reply...");
  api.sendMessage({
    body: "/uns",
    replyToMessageID: event.messageID
  }, event.threadID, (err) => {
    if (err) console.error("[voiceDetect] Failed to send /uns:", err);
    else console.log("[voiceDetect] Sent /uns successfully.");
  });
};

module.exports.run = () => {};
