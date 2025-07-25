const limit = 20;

module.exports.config = {
  name: "count",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "Optimized by ChatGPT | Original: CYBER BOT TEAM",
  description: "Check group interactions",
  commandCategory: "Group",
  usages: "[all/page] or tag/reply",
  cooldowns: 5
};

module.exports.run = async function({ args, Users, Threads, api, event, Currencies }) {
  const { threadID, senderID, messageID, type, mentions, messageReply } = event;
  const mentionIDs = Object.keys(mentions);
  const { participantIDs } = (await Threads.getData(threadID)).threadInfo;

  // Prepare message count data
  const expList = await Promise.all(
    participantIDs.map(async uid => {
      const user = await Users.getData(uid);
      const count = await Currencies.getData(uid);
      return {
        name: user?.name || "Unknown User",
        exp: count?.exp || 0,
        uid
      };
    })
  );

  expList.sort((a, b) => b.exp - a.exp);

  // Function to send leaderboard
  const sendLeaderboard = (page = 1) => {
    const totalPages = Math.ceil(expList.length / limit);
    if (page > totalPages || page < 1) page = 1;

    const start = (page - 1) * limit;
    const pageData = expList.slice(start, start + limit);

    let msg = `📊 Group Message Leaderboard (Page ${page}/${totalPages}):\n\n`;
    pageData.forEach((user, i) => {
      msg += `${start + i + 1}. ${user.name} — ${user.exp} messages\n`;
    });
    msg += `\n👉 Use ${global.config.PREFIX}count all <page_number> to view more.`;
    api.sendMessage(msg, threadID);
  };

  // Show full leaderboard
  if (args[0] === "all") {
    const page = parseInt(args[1]) || 1;
    return sendLeaderboard(page);
  }

  // Mentioned user or replied user
  let targetID = null;
  if (mentionIDs.length) targetID = mentionIDs[0];
  else if (type === "message_reply") targetID = messageReply.senderID;
  else targetID = senderID;

  const rank = expList.findIndex(user => user.uid === targetID) + 1;
  const userData = expList[rank - 1];

  const targetName = await Users.getName(targetID);
  const msg = `${targetName || "User"} is ranked 🏆 ${rank} with 💬 ${userData.exp} messages!`;

  return api.sendMessage(msg, threadID, messageID);
};
