module.exports.config = {
  name: "stt",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Nayan + Modified by ChatGPT",
  description: "Send a message multiple times using hyphen before count",
  category: "spam",
  usages: "spam [message] - [amount]",
  prefix: true,
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const permission = ["61570226640452"];
  if (!permission.includes(event.senderID)) {
    return api.sendMessage("Only Bot Admin can use this command.", event.threadID, event.messageID);
  }

  const input = args.join(" ");
  const match = input.match(/^(.*)\s-\s*(\d+)$/);

  if (!match) {
    return api.sendMessage(
      "❌ Invalid format.\n✅ Use: spam your message - amount\nExample: spam i love you - 10",
      event.threadID,
      event.messageID
    );
  }

  const message = match[1].trim();
  const count = parseInt(match[2]);

  if (count <= 0 || isNaN(count)) {
    return api.sendMessage("❌ Please enter a valid positive number.", event.threadID, event.messageID);
  }

  if (count > 300) {
    return api.sendMessage("⚠️ Maximum 300 messages allowed at once.", event.threadID, event.messageID);
  }

  for (let i = 0; i < count; i++) {
    api.sendMessage(message, event.threadID);
  }
};
