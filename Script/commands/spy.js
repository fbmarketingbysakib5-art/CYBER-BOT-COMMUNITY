module.exports = {
  config: {
    name: "spy",
    version: "1.1",
    hasPermssion: 0,
    usePrefix: true,
    credits: "YourName",
    description: "Get detailed user information",
    commandCategory: "information",
    cooldowns: 10,
  },

  run: async function({ event, api, args, Users }) {
    try {
      // UID নেয়ার লজিক
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

      // ইউজার নাম ও ডাটা নেওয়া
      const userName = await Users.getNameUser(uid);
      const userData = await Users.getData(uid);

      // Facebook থেকে ইউজারের কিছু ইনফরমেশন পাওয়া চেষ্টা (মনে রাখবে api.getUserInfo() Mirai তে সব সময় কাজ নাও করতে পারে)
      let fbInfo;
      try {
        fbInfo = await api.getUserInfo(uid);
        fbInfo = fbInfo[uid];
      } catch {
        fbInfo = null;
      }

      // ডাটাবেস থেকে ডেটা গুলো
      const money = userData.money || 0;
      const exp = userData.exp || 0;
      const level = userData.level || "Not set";
      const reputation = userData.reputation || 0;
      const registered = userData.registered || false;

      // Facebook data থেকে ডাটা থাকলে নাও, না থাকলে fallback দাও
      const name = fbInfo?.name || userName || "Unknown";
      const genderMap = { 1: "Female 👩", 2: "Male 👨" };
      const gender = fbInfo?.gender ? (genderMap[fbInfo.gender] || "Other") : "Unknown";
      const birthday = fbInfo?.birthday || "Unknown";
      const profileUrl = fbInfo?.profileUrl || `https://facebook.com/profile.php?id=${uid}`;

      // মেসেজ তৈরি
      let message = `🔍 Detailed User Information\n\n`;
      message += `👤 Name: ${name}\n`;
      message += `🆔 User ID: ${uid}\n`;
      message += `🧬 Gender: ${gender}\n`;
      message += `🎂 Birthday: ${birthday}\n`;
      message += `🔗 Profile URL: ${profileUrl}\n\n`;

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
