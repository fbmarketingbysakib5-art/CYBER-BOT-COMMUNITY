module.exports = {
  config: {
    name: "spy",
    version: "1.3",
    hasPermssion: 0,
    usePrefix: true,
    credits: "YourName",
    description: "Get basic user information",
    commandCategory: "information",
    cooldowns: 10,
  },

  run: async function({ event, api, args, Users }) {
    try {
      let uid;

      // Get UID from args, mention, or reply
      if (args[0]) {
        if (/^\d+$/.test(args[0])) {
          uid = args[0];
        } else {
          const match = args[0].match(/profile\.php\?id=(\d+)/);
          if (match) uid = match[1];
        }
      }

      if (!uid) {
        uid = event.messageReply?.senderID || Object.keys(event.mentions)[0] || event.senderID;
      }

      const userName = await Users.getNameUser(uid);

      let fbInfo;
      try {
        fbInfo = await api.getUserInfo(uid);
        fbInfo = fbInfo[uid];
      } catch {
        fbInfo = null;
      }

      // ✅ Gender Mapping (same as first code)
      let gender = "Unknown ❓";
      if (fbInfo && typeof fbInfo.gender !== "undefined") {
        if (fbInfo.gender === 1) gender = "Female 👩";
        else if (fbInfo.gender === 2) gender = "Male 👨";
      }

      const name = fbInfo?.name || userName || "Unknown";

      // Final Output
      let message = `🔍 Basic User Information\n\n`;
      message += `👤 Name: ${name}\n`;
      message += `🆔 User ID: ${uid}\n`;
      message += `🧬 Gender: ${gender}`;

      return api.sendMessage(message, event.threadID, event.messageID);
    } catch (error) {
      console.log("Spy command error: ", error);
      return api.sendMessage("❌ Error fetching user info.", event.threadID, event.messageID);
    }
  }
};
