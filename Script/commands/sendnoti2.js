const fs = require('fs');
const axios = require('axios');

module.exports.config = {
	name: "sendnoti2",
	version: "1.0.2",
	hasPermssion: 2,
	credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
	description: "Send messages to groups (reply to photos/videos to be attached)!\nBetter version of sendnotiUwU",
	commandCategory: "system",
	usages: "[Text]",
	cooldowns: 5
};

module.exports.languages = {
	"vi": {
		"sendSuccess": "Đã gửi tin nhắn đến %1 nhóm!",
		"sendFail": "[!] Không thể gửi thông báo tới %1 nhóm"
	},
	"en": {
		"sendSuccess": "Sent message to %1 thread!",
		"sendFail": "[!] Can't send message to %1 thread"
	}
};

module.exports.run = async ({ api, event, args, getText }) => {
	if (event.type === "message_reply") {
		const attachmentUrl = event.messageReply.attachments[0]?.url;
		if (!attachmentUrl) return api.sendMessage("❌ No attachment found in the replied message.", event.threadID);

		// Try downloading the attachment
		const fileExt = attachmentUrl.split('.').pop().split('?')[0];
		const filePath = `${__dirname}/cache/snoti.${fileExt}`;
		try {
			const res = await axios.get(attachmentUrl, { responseType: 'arraybuffer' });
			fs.writeFileSync(filePath, Buffer.from(res.data, 'utf-8'));
		} catch (e) {
			return api.sendMessage("❌ Failed to download the attachment.", event.threadID);
		}

		// Send to all threads
		const allThread = global.data.allThreadID || [];
		let count = 1;
		let cantSend = [];

		for (const idThread of allThread) {
			if (isNaN(parseInt(idThread)) || idThread == event.threadID) continue;
			api.sendMessage({
				body: "»✦𝐔𝐩𝐝𝐚𝐭𝐞 𝐁𝐲 𝐀𝐝𝐦𝐢𝐧✦«\n\n" + args.join(" "),
				attachment: fs.createReadStream(filePath)
			}, idThread, (error) => {
				if (error) cantSend.push(idThread);
			});
			count++;
			await new Promise(resolve => setTimeout(resolve, 500));
		}

		return api.sendMessage(
			getText("sendSuccess", count),
			event.threadID,
			() => cantSend.length > 0
				? api.sendMessage(getText("sendFail", cantSend.length), event.threadID, event.messageID)
				: "",
			event.messageID
		);
	} else {
		// No reply - send plain message
		const allThread = global.data.allThreadID || [];
		let count = 1;
		let cantSend = [];

		const message = "»\x41\x6e\x6e\x6f\x75\x6e\x63\x65\x6d\x65\x6e\x74\x20\x66\x72\x6f\x6d\x20\x74\x68\x65\x20\x41\x64\x6d\x69\x6e\x20\x53\x61\x6b\x69\x62\x21«\n\n" + args.join(" ");

		for (const idThread of allThread) {
			if (isNaN(parseInt(idThread)) || idThread == event.threadID) continue;
			api.sendMessage(message, idThread, (error) => {
				if (error) cantSend.push(idThread);
			});
			count++;
			await new Promise(resolve => setTimeout(resolve, 500));
		}

		return api.sendMessage(
			getText("sendSuccess", count),
			event.threadID,
			() => cantSend.length > 0
				? api.sendMessage(getText("sendFail", cantSend.length), event.threadID, event.messageID)
				: "",
			event.messageID
		);
	}
};
