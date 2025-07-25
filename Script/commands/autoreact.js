const fs = require("fs-extra");

const REACT_CONFIG_PATH = __dirname + "/autoreact-config.json";

// Load or initialize config
let reactConfig = {};
if (fs.existsSync(REACT_CONFIG_PATH)) {
  reactConfig = fs.readJsonSync(REACT_CONFIG_PATH);
}

module.exports.config = {
  name: "autoreact",
  version: "2.0.0",
  hasPermission: 2, // Only admins can toggle
  credits: "CYBER TEAM & Enhanced by ChatGPT",
  description: "Auto reacts to certain keywords. Admins can turn it on/off per group.",
  commandCategory: "group",
  usages: "autoreact [on/off]",
  cooldowns: 3,
};

module.exports.handleEvent = function ({ api, event }) {
  const { threadID, messageID, body } = event;
  if (!reactConfig[threadID]) return; // If not enabled in this thread, do nothing

  let react = body?.toLowerCase();
  if (!react) return;

  if (react.includes("love") || react.includes("kiss") || react.includes("baby")) {
    api.setMessageReaction("❤️", messageID, () => {}, true);
  } else if (react.includes("sad") || react.includes("pain") || react.includes(":(")) {
    api.setMessageReaction("😢", messageID, () => {}, true);
  } else if (react.includes("wow") || react.includes("robot")) {
    api.setMessageReaction("😮", messageID, () => {}, true);
  }
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const permission = global.config.ADMINBOT || [];

  if (!permission.includes(event.senderID)) {
    return api.sendMessage("Only bot admins can use this command.", threadID, messageID);
  }

  const action = args[0]?.toLowerCase();
  if (!action || !["on", "off"].includes(action)) {
    return api.sendMessage("Usage: autoreact on/off", threadID, messageID);
  }

  if (action === "on") {
    reactConfig[threadID] = true;
    fs.writeJsonSync(REACT_CONFIG_PATH, reactConfig);
    return api.sendMessage("✅ Auto reaction enabled in this group.", threadID, messageID);
  } else if (action === "off") {
    delete reactConfig[threadID];
    fs.writeJsonSync(REACT_CONFIG_PATH, reactConfig);
    return api.sendMessage("❌ Auto reaction disabled in this group.", threadID, messageID);
  }
};


