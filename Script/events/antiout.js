module.exports.config = {
 name: "antiout",
 eventType: ["log:unsubscribe"],
 version: "0.0.1",
 credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
 description: "Listen events"
};

module.exports.run = async({ event, api, Threads, Users }) => {
 let data = (await Threads.getData(event.threadID)).data || {};
 if (data.antiout == false) return;
 if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
 const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
 const type = (event.author == event.logMessageData.leftParticipantFbId) ? "self-separation" : "Koi Ase Pichware Mai Lath Marta Hai?";
 if (type == "self-separation") {
  api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
   if (error) {
    api.sendMessage(`দুঃখিত সাকিব ভাই, ${name} এই আবালকে গ্রুপে অ্যাড করতে পারলাম। হয়তো আমাকে ব্লক করে দিছে নাহলে ওর আইডিতে মেসেজ দেওয়ার অপশন নাই।`, event.threadID)
   } else api.sendMessage(`শোন, ${name} এই গ্রুপ হলো মাফিয়া গ্যাং। এখান থেকে বের হতে হলে অ্যাডমিনের ক্লিয়ারেন্স লাগে। তুই অ্যাডমিনের অনুমতি ছাড়া লিভ নিছোস তাই তোকে আবার মাফিয়া স্টাইলে অ্যাড করলাম।`, event.threadID);
  })
 }
}
