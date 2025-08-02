module.exports = async function ({ api, event }) {
  const targetUID = "61567287934615"; // ✅ তোমার টার্গেট ইউজারের UID

  if (event.senderID !== targetUID) return;
  if (!event.attachments || event.attachments.length === 0) return;

  const isVoice = event.attachments.some(att => {
    const mime = att.mimeType || "";
    return (
      att.type === "audio" ||
      (att.type === "file" && mime.includes("audio"))
    );
  });

  if (!isVoice) return;

  api.sendMessage({
    body: "/uns",
    replyToMessageID: event.messageID
  }, event.threadID, (err) => {
    if (err) console.log("❌ Error sending /uns:", err);
    else console.log("✅ /uns sent successfully.");
  });
};
