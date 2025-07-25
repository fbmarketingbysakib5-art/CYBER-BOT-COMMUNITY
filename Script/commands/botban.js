module.exports.config = {
  name: "otherbots",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
  description: "Automatically ban other bots to avoid spam",
  commandCategory: "config",
  cooldowns: 0
};

module.exports.handleEvent = async ({ event, api, Users }) => {
  const { threadID, messageID, body, senderID } = event;

  // Ignore messages from the bot itself
  if (senderID === api.getCurrentUserID()) return;

  const moment = require("moment-timezone");
  const time = moment().tz("Asia/Dhaka").format("HH:mm:ss L");

  const bannedPhrases = [
    "your keyboard level has reached level",
    "Command not found",
    "The command you used",
    "Please mention 1 person.",
    "Unsend this message",
    "You are unable to use bot",
    "»» NOTICE «« Update user nicknames",
    "just removed 1 Attachments",
    "message removedcontent",
    "The current preset is",
    "Here Is My Prefix",
    "just removed 1 attachment.",
    "Unable to re-add members",
    "removed 1 message content:",
    "Here's your music, enjoy!🥰",
    "Ye Raha Aapka Music, enjoy!🥰",
    "your keyboard Power level Up",
    "bot ki mc",
    "your keyboard hero level has reached level"
  ];

  // Check if the message contains any banned phrase
  const isOtherBot = bannedPhrases.some(phrase => body && body.toLowerCase().includes(phrase.toLowerCase()));
  if (!isOtherBot) return;

  const userName = await Users.getNameUser(senderID);

  // Mark user as banned
  const userData = (await Users.getData(senderID)).data || {};
  userData.banned = 1;
  userData.reason = "Detected as other bot";
  userData.dateAdded = time;

  // Update global data
  Users.setData(senderID, { data: userData });
  global.data.userBanned.set(senderID, {
    reason: userData.reason,
    dateAdded: userData.dateAdded
  });

  // Send warning to user
  api.sendMessage(
    `${userName},\nYou have been detected as a bot and have been banned to prevent spam.`,
    threadID
  );

  // Notify all admins
  const adminList = global.config.ADMINBOT || [];
  for (const adminID of adminList) {
    api.sendMessage(
      `=== Bot Alert ===\n👤 Name: ${userName}\n🔰 UID: ${senderID}\n❌ Reason: Detected as bot\n⏰ Time: ${time}`,
      adminID
    );
  }
};

module.exports.run = async ({ event, api }) => {
  api.sendMessage(
    "This module automatically detects and bans other bots based on common bot messages.",
    event.threadID
  );
};
