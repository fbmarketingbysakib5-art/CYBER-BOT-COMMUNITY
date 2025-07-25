module.exports.config = {
  'name': "botinfo",
  'version': "1.0.1",
  'hasPermssion': 0x0,
  'credits': "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
  'description': " Bot info.",
  'commandCategory': "system",
  'cooldowns': 0x1,
  'dependencies': {
    'request': '',
    'fs-extra': '',
    'axios': ''
  }
};
module.exports.run = async function ({
  api: _0x46a1d7,
  event: _0x512e98,
  args: _0x1e41e1,
  client: _0x6fdbce,
  Users: _0x4c4c46,
  Threads: _0x5bf94a,
  __GLOBAL: _0x299677,
  Currencies: _0x5b3ab6
}) {
  const _0x5856dd = global.nodemodule.request;
  const _0x2c670e = global.nodemodule["fs-extra"];
  const _0x5ababc = process.uptime();
  const _0x4d7298 = Math.floor(_0x5ababc / 3600);
  const _0x569a97 = Math.floor(_0x5ababc % 3600 / 60);
  const _0x924e67 = Math.floor(_0x5ababc % 60);
  const _0x50518c = require("moment-timezone");
  var _0x559878 = _0x50518c.tz("Asia/Dhaka").format("『D/MM/YYYY』 【HH:mm:ss】");
  var _0x4b54f5 = ["https://i.imgur.com/gSW285Z.gif", "https://i.postimg.cc/QdgH08j6/Messenger-creation-C2-A39-DCF-A8-E7-4-FC7-8715-2559476-FEEF4.gif"];
  var _0xf84b68 = () => _0x46a1d7.sendMessage({
    'body': "╭──────•◈•───────╮\n☄️𝘽𝙊𝙏𝙉𝘼𝙈𝙀☄️ »» " + global.config.BOTNAME + "\n🌸𝙋𝙍𝙀𝙁𝙄𝙓🌸  »» " + global.config.PREFIX + " ««\n\n🥳𝙐𝙋𝙏𝙄𝙈𝙀🥳\n\n𝑫𝑨𝑻𝑬 𝑨𝑵𝑫 𝑻𝑰𝑴𝑬 \n" + _0x559878 + "\n\n⚡𝘽𝙊𝙏 𝙄𝙎 𝙍𝙐𝙉𝙉𝙄𝙉𝙂⚡ \n🕛" + _0x4d7298 + ':' + _0x569a97 + ':' + _0x924e67 + "🕧\n╰──────•◈•───────╯",
    'attachment': _0x2c670e.createReadStream(__dirname + "/cache/juswa1.jpg")
  }, _0x512e98.threadID, () => _0x2c670e.unlinkSync(__dirname + "/cache/juswa1.jpg"));
  return _0x5856dd(encodeURI(_0x4b54f5[Math.floor(Math.random() * _0x4b54f5.length)])).pipe(_0x2c670e.createWriteStream(__dirname + "/cache/juswa1.jpg")).on("close", () => _0xf84b68());
};
