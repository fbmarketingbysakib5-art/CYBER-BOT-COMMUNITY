module.exports = {
  config: {
    name: "spy",
    version: "1.2",
    hasPermssion: 0,
    usePrefix: true,
    credits: "YourName",
    description: "Get detailed user information",
    commandCategory: "information",
    cooldowns: 10,
  },

  run: async function({ event, api, args, Users }) {
    try {
      // UID সংগ্রহ
      let uid;

      if (args[0]) {
        if (/^\d+$/.test(args[0])) {
          uid = args[0];
        } else {
          const match = args[0].match(/profile\.php\?id=(\d+)/);
          if (match) uid = match[1];
        }
      }

      if (!uid) {
        uid = event.messageReply ? event.messageReply.senderID : (Object.keys(event.mentions)[0] || event.senderID);
      }

      // ইউজার নাম ও ডেটা
      const userName = await Users.getNameUser(uid);
      const userData = await Users.getData(uid);

      // Facebook থেকে ইনফো ট্রাই করা
      let fbInfo;
      try {
        fbInfo = await api.getUserInfo(uid);
        fbInfo = fbInfo[uid];
      } catch {
        fbInfo = null;
      }

      // ইউজার ডেটা
      const money = userData.money || 0;
      const exp = userData.exp || 0;
      const level = userData.level || "Not set";
      const reputation = userData.reputation || 0;
      const registered = userData.registered || false;

      // Gender mapping (প্রথম কোডের মত করে)
      let gender = "Unknown";
      if (fbInfo && typeof fbInfo.gender !== "undefined") {
        if (fbInfo.gender === 1) gender = "Female 👩";
        else if (fbInfo.gender === 2) gender = "Male 👨";
        else gender = "Unknown";
      }

      const name = fbInfo?.name || userName || "Unknown";

      // ফাইনাল মেসেজ
      let message = `🔍 Detailed User Information\n\n`;
      message += `👤 Name: ${name}\n`;
      message += `🆔 User ID: ${uid}\n`;
      message += `🧬 Gender: ${gender}\n\n`;

      message += `💰 Money: $${money}\n`;
      message += `⭐ EXP: ${exp}\n`;
      message += `📊 Level: ${level}\n`;
      message += `👍 Reputation: ${reputation}\n`;
      message += `✅ Registered: ${registered ? "Yes" : "No"}\n`;

      return api.sendMessage(message, event.threadID, event.messageID);
    } catch (error) {
      console.log("Spy command error: ", error);
      return api.sendMessage("❌ Error fetching user info.", event.threadID, event.messageID);
    }
  }
};
