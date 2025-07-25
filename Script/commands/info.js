module.exports.config = {
  name: "info",
  version: "1.2.6",
  hasPermssion: 0,
  credits: "Shaon Ahmed",
  description: "🥰আসসালামু আলাইকুম 🥰",
  commandCategory: "For users",
  hide: true,
  usages: "",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args, Users, permssion, getText, Threads }) {
  const { threadID } = event;
  const { configPath } = global.client;
  const { ADMINBOT } = global.config;
  const { NDH } = global.config;
  const { commands } = global.client;

  const fs = global.nodemodule["fs-extra"];
  const moment = require("moment-timezone");

  // Reload config
  delete require.cache[require.resolve(configPath)];
  const config = require(configPath);

  const PREFIX = config.PREFIX;
  const namebot = config.BOTNAME;
  const threadSetting = (await Threads.getData(String(threadID))).data || {};
  const prefix = threadSetting.hasOwnProperty("PREFIX") ? threadSetting.PREFIX : global.config.PREFIX;

  // Time and bot uptime
  const dateNow = Date.now();
  const time = process.uptime();
  const hours = Math.floor(time / (60 * 60));
  const minutes = Math.floor((time % (60 * 60)) / 60);
  const seconds = Math.floor(time % 60);

  // Admin and NDH list
  const listAdmin = ADMINBOT || config.ADMINBOT || [];
  const listNDH = NDH || config.NDH || [];
  let i = 1;
  const msg = [];

  for (const idAdmin of listAdmin) {
    if (parseInt(idAdmin)) {
      const name = await Users.getNameUser(idAdmin);
      msg.push(`${i++}/ ${name} - ${idAdmin}`);
    }
  }

  for (const idNDH of listNDH) {
    if (parseInt(idNDH)) {
      const name1 = (await Users.getData(idNDH)).name;
      msg.push(`${i++}/ ${name1} - ${idNDH}`);
    }
  }

  // Final message
  return api.sendMessage({
    body: `🍀----আসসালামু আলাইকুম----🍀

┏━━•❅•••❈•••❈•••❅•━━┓
「 ${namebot} 」
┗━━•❅•••❈•••❈•••❅•━━┛

↓↓ 𝗥𝗢𝗕𝗢𝗧 𝗦𝗬𝗦𝗧𝗘𝗠 𝗜𝗡𝗙𝗢 ↓↓
» Prefix system: ${PREFIX}
» Prefix box: ${prefix}
» Total modules: ${commands.size}
» Ping: ${Date.now() - dateNow}ms

↓↓ 𝗥𝗢𝗕𝗢𝗧 𝗢𝗪𝗡𝗘𝗥 ↓↓
NAME     : SAKIB
FACEBOOK : https://www.facebook.com/Sakib.bhai.4x/
WHATSAPP : +8801765051219
↓↓ Active Time ↓↓
⏱ ${hours} : ${minutes} : ${seconds} second(s)

↓↓ Total Users & Groups ↓↓
👤 Users: ${global.data.allUserID.length}
👥 Groups: ${global.data.allThreadID.length}

🧡 Thanks for using our bot`
  }, threadID);
};
