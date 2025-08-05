module.exports = {
  config: {
    name: "spy",
    version: "1.0",
    hasPermssion: 0,
    usePrefix: true,
    credits: "YourName",
    description: "Get basic user information",
    commandCategory: "information",
    cooldowns: 10,
  },

  run: async function({ event, api, args, Users }) {
    try {
      // UID নেয়ার লজিক
      let uid;

      if (args[0]) {
        // যদি সরাসরি আইডি দেওয়া হয়
        if (/^\d+$/.test(args[0])) {
          uid = args[0];
        } else {
          // যদি profile.php?id=12345 দেওয়া হয়
          const match = args[0].match(/profile\.php\?id=(\d+)/);
          if (match) uid = match[1];
        }
      }

      // যদি না দেয়, তাহলে reply ইউজার বা মেনশন ইউজারের আইডি নাও, নাহলে senderID
      if (!uid) {
        uid = event.messageReply ? event.messageReply.senderID : (Object.keys(event.mentions)[0] || event.senderID);
      }

      // ইউজারের নাম এবং ডাটা নেওয়া
      const userName = await Users.getNameUser(uid);
      const userData = await Users.getData(uid);

      // মনি, এক্সপি ইত্যাদি
      const money = userData.money || 0;
      const exp = userData.exp || 0;

      // basic ইনফরমেশন
      let message = `🔍 User Information:\n\n`;
      message += `👤 Name: ${userName}\n`;
      message += `🆔 ID: ${uid}\n`;
      message += `💰 Money: $${money}\n`;
      message += `⭐ EXP: ${exp}\n`;

      // মেসেজ সেন্ড করো
      return api.sendMessage(message, event.threadID, event.messageID);
    } catch (error) {
      console.log("Spy command error: ", error);
      return api.sendMessage("❌ Error fetching user info.", event.threadID, event.messageID);
    }
  }
};
