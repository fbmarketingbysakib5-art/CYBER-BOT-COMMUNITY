module.exports.config = {
    name: "joinNoti",
    eventType: ["log:subscribe"],
    version: "1.0.1",
    credits: "CYBER ☢️ BOT TEAM",
    description: "Text-only welcome message when new member joins"
};

module.exports.run = async function ({ api, event }) {
    const { threadID } = event;

    // বট যদি নিজে যোগ হয়
    if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
        api.changeNickname(`[ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? " " : global.config.BOTNAME}`, threadID, api.getCurrentUserID());

        return api.sendMessage(
            `╭•┄┅═══❁🌺❁═══┅┄•╮\n   আসসালামু আলাইকুম-!!🖤💫\n╰•┄┅═══❁🌺❁═══┅┄•╯\n\n𝐓𝐡𝐚𝐧𝐤𝐬 𝐟𝐨𝐫 𝐚𝐝𝐝𝐢𝐧𝐠 𝐦𝐞 𝐭𝐨 𝐲𝐨𝐮𝐫 𝐠𝐫𝐨𝐮𝐩 🖤🤗\n\n${global.config.PREFIX}help লিখে কমান্ড দেখতে পারো!\n\n⚔️ BOT BY SAKIB ⚔️`,
            threadID
        );
    }

    // অন্য কেউ যোগ হলে
    try {
        let { threadName, participantIDs } = await api.getThreadInfo(threadID);

        let nameArray = [];
        let mentions = [];
        let memberCount = participantIDs.length;

        for (let user of event.logMessageData.addedParticipants) {
            nameArray.push(user.fullName);
            mentions.push({ tag: user.fullName, id: user.userFbId });
        }

        const message =
`╭•┄┅═══❁🌺❁═══┅┄•╮
   আসসালামু আলাইকুম-!!🖤
╰•┄┅═══❁🌺❁═══┅┄•╯ 

✨🆆🅴🅻🅻 🅲🅾🅼🅴✨

আমাদের গ্রুপে আপনাকে স্বাগতম।

আপনি আমাদের গ্রুপের ${memberCount} নং মেম্বার।

╭•┄┅═══❁🌺❁═══┅┄•╮
>>>>BOT BY SAKIB>>>
╰•┄┅═══❁🌺❁═══┅┄•╯`;

        return api.sendMessage({ body: message, mentions }, threadID);
    } catch (err) {
        console.log("Join welcome error: ", err);
    }
};
