module.exports.config = {
    name: "leave",
    eventType: ["log:unsubscribe"],
    version: "1.0.2",
    credits: "CYBER ☢️_𖣘 -BOT TEAM_ ☢️ + Fixed & Gender by ChatGPT",
    description: "Notify when someone leaves the group with gender-specific text",
    dependencies: {
        "moment-timezone": ""
    }
};

module.exports.run = async function ({ api, event, Users, Threads }) {
    const moment = require("moment-timezone");

    // নিজের উপর ইভেন্ট হলে স্কিপ
    if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;

    const { threadID } = event;
    const userID = event.logMessageData.leftParticipantFbId;

    // থ্রেড ও ইউজার ডেটা
    const data = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data;
    const name = global.data.userName.get(userID) || await Users.getNameUser(userID);
    const type = (event.author == userID) ? "leave" : "managed";
    const time = moment.tz("Asia/Dhaka").format("DD/MM/YYYY || HH:mm:ss");
    const hours = moment.tz("Asia/Dhaka").format("HH");

    // জেন্ডার বের করা
    let genderText = "ভাই"; // ডিফল্ট
    try {
        const userInfo = await Users.getInfo(userID);
        if (userInfo.gender) {
            if (userInfo.gender.toLowerCase() === "female") genderText = "বোন";
        }
    } catch (err) {
        // কিছু না করলে ডিফল্ট "ভাই" থাকবে
    }

    // মেসেজ সেট
    let msg = (typeof data.customLeave == "undefined")
        ? "╭═════⊹⊱✫⊰⊹═════╮\n ⚠️ গুরুতর ঘোষণা ⚠️\n╰═════⊹⊱✫⊰⊹═════╯\n\n{session} || {name} {genderText} এই মুহূর্তে নিখোজ হয়ে গেছেন। উনি আর নাই মানে গ্রুপে নাই 😂\n\n⏰ তারিখ ও সময়: {time}\n⚙️ স্ট্যাটাস: {type}"
        : data.customLeave;

    msg = msg
        .replace(/\{name}/g, name)
        .replace(/\{type}/g, type)
        .replace(/\{genderText}/g, genderText)
        .replace(/\{session}/g,
            hours <= 10 ? "𝙈𝙤𝙧𝙣𝙞𝙣𝙜" :
                hours > 10 && hours <= 12 ? "𝘼𝙛𝙩𝙚𝙧𝙉𝙤𝙤𝙣" :
                    hours > 12 && hours <= 18 ? "𝙀𝙫𝙚𝙣𝙞𝙣𝙜" : "𝙉𝙞𝙜𝙝𝙩")
        .replace(/\{time}/g, time);

    return api.sendMessage(msg, threadID);
};
