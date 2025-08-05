module.exports = {
  config: {
    name: "spy",
    version: "2.0",
    hasPermission: 0,
    credits: "ChatGPT",
    description: "View user info by UID, tag, or reply",
    commandCategory: "info",
    cooldowns: 5
  },

  run: async function({ api, event, args, Users }) {
    try {
      let uid;

      // 1. Get UID from args, mentions, or reply
      if (args[0]) {
        const urlMatch = args[0].match(/profile\.php\?id=(\d+)/);
        uid = urlMatch ? urlMatch[1] : args[0];
      }

      if (!uid && Object.keys(event.mentions).length > 0) {
        uid = Object.keys(event.mentions)[0];
      }

      if (!uid && event.messageReply) {
        uid = event.messageReply.senderID;
      }

      if (!uid) {
        uid = event.senderID;
      }

      // 2. Fetch user info from Facebook
      const info = await api.getUserInfo(uid);
      const user = info[uid];

      if (!user) throw new Error("User not found");

      // 3. User stats from bot database
      const userData = await Users.get(uid);
      const allUsers = await Users.getAll();

      const money = userData.money || 0;
      const exp = userData.exp || 0;

      const rank = allUsers.sort((a, b) => b.exp - a.exp)
        .findIndex(u => u.userID == uid) + 1;

      const moneyRank = allUsers.sort((a, b) => b.money - a.money)
        .findIndex(u => u.userID == uid) + 1;

      // 4. Gender check
      let gender = "Unknown";
      if (user.gender == 1) gender = "Girl 🙋‍♀️";
      else if (user.gender == 2) gender = "Boy 🙋‍♂️";

      // 5. Build and send message
      const message = `
👤 𝗨𝗦𝗘𝗥 𝗜𝗡𝗙𝗢
━━━━━━━━━━━━━━
📛 Name: ${user.name}
🆔 UID: ${uid}
🔗 Profile: ${user.profileUrl || "Unavailable"}
💬 Username: ${user.vanity || "N/A"}
🚻 Gender: ${gender}
🎂 Birthday: ${user.isBirthday || "Private"}
🤝 Friend with bot: ${user.isFriend ? "Yes ✅" : "No ❌"}

📊 𝗨𝗦𝗘𝗥 𝗦𝗧𝗔𝗧𝗦
💰 Balance: $${money}
📈 Exp: ${exp}
🏆 EXP Rank: #${rank}/${allUsers.length}
💵 Money Rank: #${moneyRank}/${allUsers.length}
      `;

      return api.sendMessage(message.trim(), event.threadID, event.messageID);

    } catch (err) {
      console.error("Spy error:", err);
      return api.sendMessage("❌ Error: User info আনতে সমস্যা হয়েছে। হয়ত প্রোফাইল লকড/বন্ধ বা বট ফ্রেন্ড না।", event.threadID, event.messageID);
    }
  }
};
