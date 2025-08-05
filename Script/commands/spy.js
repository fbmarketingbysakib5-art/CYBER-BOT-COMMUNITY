const axios = require("axios");

module.exports = {
  config: {
    name: "spy",
    version: "1.0",
    hasPermission: 0,
    usePrefix: true,
    credits: "Modified by ChatGPT",
    description: "Get user information",
    commandCategory: "information",
    cooldowns: 5,
  },

  run: async function ({ api, event, args, Users }) {
    try {
      let uid;

      // Check if UID, profile link, mention, or reply
      if (args[0]) {
        if (/^\d+$/.test(args[0])) {
          uid = args[0];
        } else {
          const match = args[0].match(/profile\.php\?id=(\d+)/);
          if (match) uid = match[1];
        }
      }

      if (!uid) {
        if (event.type === "message_reply") {
          uid = event.messageReply.senderID;
        } else if (Object.keys(event.mentions).length > 0) {
          uid = Object.keys(event.mentions)[0];
        } else {
          uid = event.senderID;
        }
      }

      const userInfo = await api.getUserInfo(uid);
      const info = userInfo[uid];

      if (!info) return api.sendMessage("ℹ️ User info পাওয়া যায়নি।", event.threadID);

      // Gender
      let genderText = "Unknown";
      switch (info.gender) {
        case 1: genderText = "Girl 🙋‍♀️"; break;
        case 2: genderText = "Boy 🙋‍♂️"; break;
      }

      // Birthday
      const birthdayText = info.isBirthday ? "Yes 🎂" : "No ❌";

      // Friend status
      const friendText = info.isFriend ? "Yes ✅" : "No ❎";

      // User data (money, etc.)
      const userData = await Users.get(uid);
      const money = userData?.money || 0;
      const allUser = await Users.getAll();

      const rank = allUser
        .sort((a, b) => b.exp - a.exp)
        .findIndex(user => user.userID === uid) + 1;

      const moneyRank = allUser
        .sort((a, b) => b.money - a.money)
        .findIndex(user => user.userID === uid) + 1;

      const result = `
╭─[ 👁️ USER INFO ]
├🧑 Name: ${info.name}
├🔢 UID: ${uid}
├📛 Nickname: ${info.alternateName || "None"}
├🧬 Gender: ${genderText}
├🎉 Birthday: ${birthdayText}
├🤝 Friend with bot: ${friendText}
├🌐 Profile: ${info.profileUrl || "Private"}

╰─[ 📊 USER STATS ]
├💰 Money: ${formatMoney(money)}
├🏅 EXP Rank: #${rank}/${allUser.length}
╰📈 Money Rank: #${moneyRank}/${allUser.length}
`;

      return api.sendMessage(result, event.threadID, event.messageID);
    } catch (err) {
      console.error("❌ spy command error:", err);
      return api.sendMessage("❌ Error fetching user info.", event.threadID, event.messageID);
    }
  }
};

function formatMoney(num) {
  if (typeof num !== 'number') return num;
  const units = ["", "K", "M", "B", "T"];
  let unit = 0;
  while (num >= 1000 && unit < units.length - 1) {
    num /= 1000;
    unit++;
  }
  return `${num.toFixed(1)}${units[unit]}`;
}
