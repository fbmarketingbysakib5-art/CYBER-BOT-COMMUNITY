module.exports.config = {
  name: "spy",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "CYBER",
  description: "See someone's profile info",
  commandCategory: "User",
  usages: "[mention/reply/uid]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args, Users }) {
  const { threadID, messageID, type, messageReply, senderID, mentions } = event;
  let uid;

  // Get UID from mention, reply, argument, or self
  if (mentions && Object.keys(mentions).length > 0) {
    uid = Object.keys(mentions)[0];
  } else if (type === "message_reply") {
    uid = messageReply.senderID;
  } else if (args[0]) {
    uid = args[0];
  } else {
    uid = senderID;
  }

  // Try to get user info from Facebook API
  let fbInfo;
  try {
    fbInfo = await api.getUserInfo(uid);
    fbInfo = fbInfo[uid];
  } catch (e) {
    fbInfo = null;
  }

  // Try to get user info from local database
  let userInfo = await Users.getData(uid);
  userInfo = userInfo?.data || {};

  // Gender
  let gender = "Unknown ❓";
  if (fbInfo && fbInfo.gender != null) {
    gender = fbInfo.gender === 1 ? "Female 👩" : fbInfo.gender === 2 ? "Male 👨" : "Unknown ❓";
  }

  // Build message
  let msg = `🔍 Profile Information 🔍\n\n`;
  msg += `👤 Name: ${fbInfo?.name || "Not Found"}\n`;
  msg += `🆔 UID: ${uid}\n`;
  msg += `🧬 Gender: ${gender}\n`;
  msg += `🎂 Birthday: ${userInfo.birthday || "Not set"}\n`;
  msg += `📍 Address: ${userInfo.address || "Not set"}\n`;
  msg += `🐣 Nickname: ${userInfo.nickname || "Not set"}\n`;
  msg += `🌐 Profile: https://facebook.com/${uid}\n`;

  return api.sendMessage(msg, threadID, messageID);
};
