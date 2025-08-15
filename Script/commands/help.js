module.exports.config = {
    name: "help",
    version: "1.0.2",
    hasPermssion: 0,
    credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
    description: "FREE SET-UP MESSENGER",
    commandCategory: "system",
    usages: "[Name module]",
    cooldowns: 5,
    envConfig: {
        autoUnsend: true,
        delayUnsend: 20
    }
};

module.exports.languages = {
    "en": {
        "moduleInfo": "╭──────•◈•──────╮\n |        Sakib chat b𝗼t\n |●𝗡𝗮𝗺𝗲: •—» %1 «—•\n |●𝗨𝘀𝗮𝗴𝗲: %3\n |●𝗗𝗲𝘀𝗰𝗿𝗶p𝘁𝗶𝗼𝗻: %2\n |●𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝘆: %4\n |●𝗪𝗮𝗶𝘁𝗶𝗻𝗴 𝘁𝗶𝗺𝗲: %5 seconds(s)\n |●𝗣𝗲𝗿𝗺𝗶𝘀𝘀𝗶𝗼𝗻: %6\n |𝗠𝗼𝗱𝘂𝗹𝗲 𝗰𝗼𝗱𝗲 𝗯𝘆\n |•—» SAKIB ッ «—•\n╰──────•◈•──────╯",
        "helpList": '[ There are %1 commands on this bot, Use: "%2help nameCommand" to know how to use! ]',
        "user": "User",
        "adminGroup": "Admin group",
        "adminBot": "Admin bot"
    }
};

module.exports.handleEvent = function ({ api, event, getText }) {
    const { commands } = global.client;
    const { threadID, messageID, body } = event;

    if (!body || typeof body === "undefined" || !body.startsWith("help")) return;

    const splitBody = body.trim().split(/\s+/);
    if (splitBody.length === 1 || !commands.has(splitBody[1].toLowerCase())) return;

    const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
    const command = commands.get(splitBody[1].toLowerCase());
    const prefix = threadSetting.PREFIX || global.config.PREFIX;

    const text = getText(
        "moduleInfo",
        command.config.name,
        command.config.description,
        `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`,
        command.config.commandCategory,
        command.config.cooldowns,
        (command.config.hasPermssion === 0) ? getText("user") : (command.config.hasPermssion === 1) ? getText("adminGroup") : getText("adminBot"),
        command.config.credits
    );

    return api.sendMessage(text, threadID, messageID);
}

module.exports.run = function ({ api, event, args, getText }) {
    const { commands } = global.client;
    const { threadID, messageID } = event;
    const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
    const prefix = threadSetting.PREFIX || global.config.PREFIX;
    const commandName = (args[0] || "").toLowerCase();
    const command = commands.get(commandName);

    if (commandName === "all") {
        // সমস্ত কমান্ড লিস্ট
        const groups = {};
        for (const cmd of commands.values()) {
            const cat = cmd.config.commandCategory || "Others";
            if (!groups[cat]) groups[cat] = [];
            groups[cat].push(cmd.config.name);
        }

        let msg = "❄️ Command List ❄️\n\n";
        for (const cat in groups) {
            msg += `📂 ${cat.toUpperCase()}\n${groups[cat].join(" • ")}\n\n`;
        }
        msg += `Use ${prefix}help [Name?] to see command details.\nTotal commands: ${commands.size}`;

        return api.sendMessage(msg, threadID, messageID);
    }

    if (!command) {
        return api.sendMessage(`❌ Command not found! Use ${prefix}help all to see all commands.`, threadID, messageID);
    }

    // নির্দিষ্ট কমান্ডের তথ্য দেখানো
    const text = getText(
        "moduleInfo",
        command.config.name,
        command.config.description,
        `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`,
        command.config.commandCategory,
        command.config.cooldowns,
        (command.config.hasPermssion === 0) ? getText("user") : (command.config.hasPermssion === 1) ? getText("adminGroup") : getText("adminBot"),
        command.config.credits
    );

    return api.sendMessage(text, threadID, messageID);
};
