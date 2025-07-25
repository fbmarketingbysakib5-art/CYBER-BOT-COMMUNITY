module.exports.config = {
	name: "bday",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "MAHBUBU SHAON",
	description: "See admin's birthday countdown",
	usePrefix: false,
	commandCategory: "bday",
	cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
	const fs = global.nodemodule["fs-extra"];
	const request = global.nodemodule["request"];
	const BIRTHDAY_DATE = "June 10, 2026 00:00:00"; // আপডেট করো পরবর্তী জন্মদিনে

	const now = new Date();
	const target = new Date(BIRTHDAY_DATE);

	if (now > target) {
		return api.sendMessage("🥳 অ্যাডমিনের জন্মদিন তো ইতিমধ্যে চলে গেছে! শুভ belated birthday!", event.threadID);
	}

	const t = target - now;
	const seconds = Math.floor((t / 1000) % 60);
	const minutes = Math.floor((t / 1000 / 60) % 60);
	const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	const days = Math.floor(t / (1000 * 60 * 60 * 24));

	const message = `🗓️ অ্যাডমিন সাকিব ভাই এর জন্মদিন আসতে বাকি:\n\n📅 ${days} দিন\n🕒 ${hours} ঘণ্টা\n⏰ ${minutes} মিনিট\n⏱️ ${seconds} সেকেন্ড`;

	const callback = () => {
		api.sendMessage({
			body: message,
			attachment: fs.createReadStream(__dirname + "/cache/bday.jpg")
		}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/bday.jpg"));
	};

	const avatarURL = `https://graph.facebook.com/61570226640452/picture?height=720&width=720&access_token=66262`;
	request(encodeURI(avatarURL))
		.pipe(fs.createWriteStream(__dirname + '/cache/bday.jpg'))
		.on('close', () => callback());
};
