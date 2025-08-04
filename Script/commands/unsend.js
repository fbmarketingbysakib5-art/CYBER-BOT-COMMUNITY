module.exports.config = {
	name: "unsend",
	version: "1.0.1",
	hasPermssion: 2,
	credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
	description: "Gỡ tin nhắn của bot",
	commandCategory: "system",
	usages: "unsend",
	cooldowns: 0
};

module.exports.languages = {
	"vi": {
		"returnCant": "Không thể gỡ tin nhắn của người khác.",
		"missingReply": "Hãy reply tin nhắn cần gỡ."
	},
	"en": {
		"returnCant": "আরে বলদ অন্য কারো মেসেজ আমি আনসেন্ড করবো কিভাবে পাগল ছাগল",
		"missingReply": "আপনি আমার কোন মেসেজটি আনসেন্ড করবেন , তা রিপ্লাই করুন 🌺",
		"notAllowed": "শুধু সাকিব (জ্বিনের পাপা) মেসেজ ডিলেট করতে পারবে🐥"
	}
}

module.exports.run = function({ api, event, getText }) {
	const allowedUserID = "61570226640452";
	
	// Check if the user is allowed
	if (event.senderID != allowedUserID) 
		return api.sendMessage(getText("notAllowed"), event.threadID, event.messageID);

	// Check if message is a reply and it's from the bot itself
	if (event.type != "message_reply") 
		return api.sendMessage(getText("missingReply"), event.threadID, event.messageID);

	if (event.messageReply.senderID != api.getCurrentUserID()) 
		return api.sendMessage(getText("returnCant"), event.threadID, event.messageID);

	return api.unsendMessage(event.messageReply.messageID);
}
