module.exports.config = {
	name: "giveaway",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️ (বাংলায় অনুবাদ: Ullash)",
	description: "Giveaway পরিচালনা করুন",
	commandCategory: "other",
	usages: "[create/details/join/roll/end] [IDGiveAway]",
	cooldowns: 5
};

module.exports.handleReaction = async ({ api, event, Users, handleReaction }) => {
	let data = global.data.GiveAway.get(handleReaction.ID);
	if (data.status == "close" || data.status == "ended") return;
	if (event.reaction == undefined) {
		data.joined.splice(data.joined.indexOf(event.userID), 1);
		global.data.GiveAway.set(handleReaction.ID, data);
		let userInfo = await Users.getInfo(event.userID);
		return api.sendMessage(`${userInfo.name} গিভঅ্যাওয়ে (ID: #${handleReaction.ID}) থেকে বের হয়ে গেছেন।`, event.userID);
	}
	data.joined.push(event.userID);
	global.data.GiveAway.set(handleReaction.ID, data);
	let userInfo = await Users.getInfo(event.userID);
	return api.sendMessage(`${userInfo.name} সফলভাবে গিভঅ্যাওয়ে (ID: #${handleReaction.ID}) তে যোগ দিয়েছেন।`, event.userID);
};

module.exports.run = async ({ api, event, args, Users }) => {
	if (!global.data.GiveAway) global.data.GiveAway = new Map();

	if (args[0] == "create") {
		let reward = args.slice(1).join(" ");
		let randomNumber = (Math.floor(Math.random() * 100000) + 100000).toString().substring(1);
		let userInfo = await Users.getInfo(event.senderID);
		api.sendMessage(
			"🎁 গিভঅ্যাওয়ে তৈরি হয়েছে! 🎁" +
			`\n🧑‍💼 কর্তৃক: ${userInfo.name}` +
			`\n🎉 পুরস্কার: ${reward}` +
			`\n🆔 Giveaway ID: #${randomNumber}` +
			"\n❤️ রিয়্যাক্ট করুন যোগ দিতে",
			event.threadID,
			(err, info) => {
				let dataGA = {
					ID: randomNumber,
					author: userInfo.name,
					authorID: event.senderID,
					messageID: info.messageID,
					reward,
					joined: [],
					status: "open"
				};
				global.data.GiveAway.set(randomNumber, dataGA);
				client.handleReaction.push({
					name: this.config.name,
					messageID: info.messageID,
					author: event.senderID,
					ID: randomNumber
				});
			}
		);
	}

	else if (args[0] == "details") {
		let ID = args[1]?.replace("#", "");
		if (!ID) return api.sendMessage("⚠️ একটি Giveaway ID দিন!", event.threadID, event.messageID);
		let data = global.data.GiveAway.get(ID);
		if (!data) return api.sendMessage("❌ এমন কোন Giveaway ID খুঁজে পাওয়া যায়নি!", event.threadID, event.messageID);
		return api.sendMessage(
			"📋 Giveaway এর বিস্তারিতঃ" +
			`\n👨‍💼 তৈরি করেছেন: ${data.author} (${data.authorID})` +
			`\n🎁 পুরস্কার: ${data.reward}` +
			`\n🆔 ID: #${data.ID}` +
			`\n👥 অংশগ্রহণকারী: ${data.joined.length} জন` +
			`\n📌 অবস্থা: ${data.status}`,
			event.threadID,
			data.messageID
		);
	}

	else if (args[0] == "join") {
		let ID = args[1]?.replace("#", "");
		if (!ID) return api.sendMessage("⚠️ একটি Giveaway ID দিন!", event.threadID, event.messageID);
		let data = global.data.GiveAway.get(ID);
		if (!data) return api.sendMessage("❌ এমন কোন Giveaway ID খুঁজে পাওয়া যায়নি!", event.threadID, event.messageID);
		if (data.joined.includes(event.senderID)) return api.sendMessage("✅ আপনি ইতিমধ্যেই এই Giveaway-তে যোগ দিয়েছেন।", event.threadID);
		data.joined.push(event.senderID);
		global.data.GiveAway.set(ID, data);
		let userInfo = await Users.getInfo(event.senderID);
		return api.sendMessage(`${userInfo.name} সফলভাবে গিভঅ্যাওয়ে (ID: #${ID}) তে যোগ দিয়েছেন।`, event.senderID);
	}

	else if (args[0] == "roll") {
		let ID = args[1]?.replace("#", "");
		if (!ID) return api.sendMessage("⚠️ একটি Giveaway ID দিন!", event.threadID, event.messageID);
		let data = global.data.GiveAway.get(ID);
		if (!data) return api.sendMessage("❌ এমন কোন Giveaway ID খুঁজে পাওয়া যায়নি!", event.threadID, event.messageID);
		if (data.authorID !== event.senderID) return api.sendMessage("⛔ আপনি এই Giveaway-এর মালিক নন!", event.threadID, event.messageID);
		let winner = data.joined[Math.floor(Math.random() * data.joined.length)];
		let userInfo = await Users.getInfo(winner);
		return api.sendMessage({
			body: `🎉 অভিনন্দন ${userInfo.name}!\nআপনি Giveaway (#${data.ID}) এর বিজয়ী হয়েছেন!\n📩 পুরস্কার পেতে যোগাযোগ করুন: ${data.author} (https://fb.me/${data.authorID})`,
			mentions: [{ tag: userInfo.name, id: winner }]
		}, event.threadID, event.messageID);
	}

	else if (args[0] == "end") {
		let ID = args[1]?.replace("#", "");
		if (!ID) return api.sendMessage("⚠️ একটি Giveaway ID দিন!", event.threadID, event.messageID);
		let data = global.data.GiveAway.get(ID);
		if (!data) return api.sendMessage("❌ এমন কোন Giveaway ID খুঁজে পাওয়া যায়নি!", event.threadID, event.messageID);
		if (data.authorID !== event.senderID) return api.sendMessage("⛔ আপনি এই Giveaway-এর মালিক নন!", event.threadID, event.messageID);
		data.status = "ended";
		global.data.GiveAway.set(ID, data);
		api.unsendMessage(data.messageID);
		return api.sendMessage(`✅ Giveaway (#${data.ID}) শেষ হয়েছে! সমাপ্ত করেছেন: ${data.author}`, event.threadID, event.messageID);
	}

	else return global.utils.throwError(this.config.name, event.threadID, event.messageID);
};
