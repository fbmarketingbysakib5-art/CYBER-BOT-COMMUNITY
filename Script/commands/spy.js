module.exports = {
  config: {
    name: "spy",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "CYBER",
    description: "Show detailed user info including nickname, birthday, address",
    commandCategory: "User",
    usages: "[mention/reply/uid]",
    cooldowns: 5,
  },

  run: async function({ api, event, args, Users }) {
    const { threadID, messageID, type, messageReply, senderID, mentions } = event;
    let uid;

    // UID determination
    if (mentions && Object.keys(mentions).length > 0) {
      uid = Object.keys(mentions)[0];
    } else if (type === "message_reply") {
      uid = messageReply.senderID;
    } else if (args[0]) {
      uid = args[0];
    } else {
      uid = senderID;
    }

    // Facebook API info
    let fbInfo;
    try {
      fbInfo = await api.getUserInfo(uid);
      fbInfo = fbInfo[uid];
    } catch {
      fbInfo = null;
    }

    // Local DB user data
    let userInfo = await Users.getData(uid);
    let data = userInfo?.data || {};

    // Gender mapping
    let gender = "Unknown ❓";
    if (fbInfo && typeof fbInfo.gender !== "undefined") {
      if (fbInfo.gender === 1) gender = "Female 👩";
      else if (fbInfo.gender === 2) gender = "Male 👨";
    }

    // Compose message
    let msg = `🔍 Profile Information 🔍\n\n`;
    msg += `👤 Name: ${fbInfo?.name || "Unknown"}\n`;
    msg += `🆔 UID: ${uid}\n`;
    msg += `🧬 Gender: ${gender}\n`;
    msg += `🎂 Birthday: ${data.birthday || userInfo.birthday || "Not set"}\n`;
    msg += `📍 Address: ${data.address || userInfo.address || "Not set"}\n`;
    msg += `🐣 Nickname: ${data.nickname || userInfo.nickname || "Not set"}\n`;
    msg += `🌐 Profile: https://facebook.com/${uid}\n`;

    return api.sendMessage(msg, threadID, messageID);
  }
};
