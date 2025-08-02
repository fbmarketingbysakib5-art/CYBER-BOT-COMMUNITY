module.exports.config = {
  'name': "approve",
  'version': "1.0.2",
  'hasPermssion': 0x2,
  'credits': "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
  'description': "approve the gc using bots xD",
  'commandCategory': "Admin",
  'cooldowns': 0x5
};
const dataPath = __dirname + "/ullash/approvedThreads.json";
const dataPending = __dirname + "/ullash/pendingdThreads.json";
const fs = require('fs');
module.exports.onLoad = () => {
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, JSON.stringify([]));
  }
  if (!fs.existsSync(dataPending)) {
    fs.writeFileSync(dataPending, JSON.stringify([]));
  }
};
module.exports.handleReply = async function ({
  event: _0x4d1d85,
  api: _0x84ed6b,
  Currencies: _0x3bbdd9,
  handleReply: _0x284091,
  Users: _0x2b6c8e,
  args: _0x59498d
}) {
  if (_0x284091.author != _0x4d1d85.senderID) {
    return;
  }
  const {
    body: _0x33b041,
    threadID: _0x42b442,
    messageID: _0x2bf6d2,
    senderID: _0x39eae6
  } = _0x4d1d85;
  const {
    type: _0x2d9b5b
  } = _0x284091;
  let _0x34836a = JSON.parse(fs.readFileSync(dataPath));
  let _0x3ce714 = JSON.parse(fs.readFileSync(dataPending));
  let _0x325f76 = _0x59498d[0] ? _0x59498d[0] : _0x42b442;
  switch (_0x2d9b5b) {
    case "pending":
      {
        switch (_0x33b041) {
          case 'A':
            {
              _0x34836a.push(_0x325f76);
              fs.writeFileSync(dataPath, JSON.stringify(_0x34836a, null, 2));
              _0x84ed6b.sendMessage("» Successfully approved the box:\n" + _0x325f76, _0x42b442, () => {
                _0x3ce714.splice(_0x3ce714.indexOf(_0x325f76), 1);
                fs.writeFileSync(dataPending, JSON.stringify(_0x3ce714, null, 2));
              }, _0x2bf6d2);
            }
        }
      }
  }
};
module.exports.run = async ({
  event: _0xac24a0,
  api: _0x2d2682,
  args: _0x4669ac,
  Threads: _0x49260c,
  handleReply: _0x17c59c,
  Users: _0x253d87
}) => {
  const {
    threadID: _0x42dde2,
    messageID: _0xd078af,
    senderID: _0x34ddda
  } = _0xac24a0;
  let _0x47319e = JSON.parse(fs.readFileSync(dataPath));
  let _0x3b38df = JSON.parse(fs.readFileSync(dataPending));
  let _0x1c6470 = '';
  var _0x5baf06 = _0x4669ac.splice(2).join(" ");
  let _0x49867d = _0x4669ac[0] ? _0x4669ac[0] : _0x42dde2;
  if (_0x4669ac[0] == "list" || _0x4669ac[0] == 'l') {
    _0x1c6470 = "=====「 GC THAT HAD BEEN APPROVED: " + _0x47319e.length + " 」 ====";
    let _0x536c99 = 0;
    for (e of _0x47319e) {
      let _0x23d713 = await _0x2d2682.getThreadInfo(e);
      let _0x23eef0 = _0x23d713.threadName ? _0x23d713.threadName : await _0x253d87.getNameUser(e);
      _0x1c6470 += "\n〘" + (_0x536c99 += 1) + "〙» " + _0x23eef0 + "\n" + e;
    }
    _0x2d2682.sendMessage(_0x1c6470, _0x42dde2, (_0x38cbe9, _0x51fdc5) => {
      global.client.handleReply.push({
        'name': this.config.name,
        'messageID': _0x51fdc5.messageID,
        'author': _0xac24a0.senderID,
        'type': 'a'
      });
    }, _0xd078af);
  } else {
    if (_0x4669ac[0] == "pending" || _0x4669ac[0] == 'p') {
      _0x1c6470 = "=====「 THREADS NEED TO BE APPROVE: " + _0x3b38df.length + " 」 ====";
      let _0x4a334a = 0;
      for (e of _0x3b38df) {
        let _0x472c08 = await _0x2d2682.getThreadInfo(e);
        let _0x259c66 = _0x472c08.threadName ? _0x472c08.threadName : await _0x253d87.getNameUser(e);
        _0x1c6470 += "\n〘" + (_0x4a334a += 1) + "〙» " + _0x259c66 + "\n" + e;
      }
      _0x2d2682.sendMessage(_0x1c6470, _0x42dde2, (_0x205a9c, _0x1945e5) => {
        global.client.handleReply.push({
          'name': this.config.name,
          'messageID': _0x1945e5.messageID,
          'author': _0xac24a0.senderID,
          'type': "pending"
        });
      }, _0xd078af);
    } else {
      if (_0x4669ac[0] == "help" || _0x4669ac[0] == 'h') {
        const _0x6c287c = (await _0x49260c.getData(String(_0xac24a0.threadID))).data || {};
        const _0x439cd8 = _0x6c287c.hasOwnProperty("PREFIX") ? _0x6c287c.PREFIX : global.config.PREFIX;
        const _0x40daf9 = this.config.name;
        const _0x48d5e7 = this.config.credits;
        return _0x2d2682.sendMessage("=====「 APPROVE 」=====\n\n" + _0x439cd8 + _0x40daf9 + " l/list => see list of approved boxes\n\n" + _0x439cd8 + _0x40daf9 + " p/pending => see the list of unapproved boxes\n\n" + _0x439cd8 + _0x40daf9 + " d/del => with ID to remove from bot used list\n\n" + _0x439cd8 + _0x40daf9 + " => Attach an ID to browse that box\n\n⇒ " + _0x48d5e7 + " ⇐", _0x42dde2, _0xd078af);
      } else {
        if (_0x4669ac[0] == "del" || _0x4669ac[0] == 'd') {
          _0x49867d = _0x4669ac[1] ? _0x4669ac[1] : _0xac24a0.threadID;
          if (isNaN(parseInt(_0x49867d))) {
            return _0x2d2682.sendMessage("[ ERR ] Not a number", _0x42dde2, _0xd078af);
          }
          if (!_0x47319e.includes(_0x49867d)) {
            return _0x2d2682.sendMessage("[ ERR ] Box is not pre-approved!", _0x42dde2, _0xd078af);
          }
          _0x2d2682.sendMessage("[ OK ] Your group has been removed from the browsing list by the admin for the reason: " + _0x5baf06, _0x49867d);
          _0x2d2682.sendMessage("[ OK ] Box has been removed from the list of allowed bots", _0x42dde2, () => {
            _0x47319e.splice(_0x47319e.indexOf(_0x49867d), 1);
            fs.writeFileSync(dataPath, JSON.stringify(_0x47319e, null, 2));
          }, _0xd078af);
        } else {
          if (isNaN(parseInt(_0x49867d))) {
            _0x2d2682.sendMessage("[ ERR ] The ID you entered is not valid", _0x42dde2, _0xd078af);
          } else {
            if (_0x47319e.includes(_0x49867d)) {
              _0x2d2682.sendMessage("[ - ] ID " + _0x49867d + " pre-approved!", _0x42dde2, _0xd078af);
            } else {
              _0x2d2682.sendMessage("আসসালামু আলাইকুম..!🌸\n\nআমাকে আপনার গ্রুপে অনুমোদন করা হয়েছে। কোনো সমস্যা হলে আমার বসে সাথে যোগাযোগ করুন।\n\nAdmin : জ্বিনের পাপা\nFacebook : https://www.facebook.com/Sakib.bhai.4x\nMessenger : https://www.m.me/sakib.bhai.4x\Whatsapp : +8801765051219\n\n ধন্যবাদ সবাইকে💖💝", _0x49867d, (_0x336794, _0x2cb446) => {
                _0x2d2682.changeNickname(" 〖 " + global.config.PREFIX + " 〗 ➺ " + (!global.config.BOTNAME ? '' : global.config.BOTNAME), _0x49867d, global.data.botID);
                const _0x3b76f8 = require("axios");
                const _0x58e58c = require("request");
                const _0x5e4385 = require('fs');
                _0x2d2682.getUserInfo(parseInt("100086680386976"), (_0x4b46fe, _0x167416) => {
                  if (_0x4b46fe) {
                    return console.log(_0x4b46fe);
                  }
                  var _0x18dd00 = Object.keys(_0x167416);
                  var _0x30d9a0 = _0x167416[_0x18dd00].name.replace('@', '');
                  _0x3b76f8.get("https://anime.apibypriyansh.repl.co/img/anime").then(_0xdab07a => {
                    let _0x55c620 = _0xdab07a.data.url.substring(_0xdab07a.data.url.lastIndexOf('.') + 1);
                    let _0x3fc444 = function () {
                      _0x2d2682.sendMessage({
                        'body': "Sakib Bot now active with the light of Imaan!\n\n━━━━━━━━━━━━━━━━━━━━━━\n=====================\n\n➪ BOT: " + global.config.BOTNAME + "\n➪ Prefix: " + global.config.PREFIX + "\n➪ Users: " + global.data.allUserID.length + "\n➪ Groups: " + global.data.allThreadID.length + "\n=====================\n[]---------------------------------------[]\n 🕋 কমান্ড দেখতে লিখুন: '" + global.config.PREFIX + "Help' ✨ জ্ঞান ও আমলে ভরপুর হোক তোমার দিন।\n[]---------------------------------------[]\n⌨ Made by: " + _0x30d9a0 + "\n",
                        'mentions': [{
                          'tag': _0x30d9a0,
                          'id': "61570226640452",
                          'fromIndex': 0x0
                        }],
                        'attachment': _0x5e4385.createReadStream(__dirname + ("/cache/duyet." + _0x55c620))
                      }, _0x49867d, () => _0x5e4385.unlinkSync(__dirname + ("/cache/duyet." + _0x55c620)));
                    };
                    _0x58e58c(_0xdab07a.data.url).pipe(_0x5e4385.createWriteStream(__dirname + ("/cache/duyet." + _0x55c620))).on("close", _0x3fc444);
                  });
                });
                if (_0x336794) {
                  return _0x2d2682.sendMessage("[ ERR ] Something went wrong, make sure the id you entered is valid and the bot is in the box!", _0x42dde2, _0xd078af);
                } else {
                  _0x47319e.push(_0x49867d);
                  _0x5e4385.writeFileSync(dataPath, JSON.stringify(_0x47319e, null, 2));
                  _0x2d2682.sendMessage("[ OK ] Successfully Approved The Box (◕‿◕):\n" + _0x49867d, _0x42dde2, () => {
                    _0x3b38df.splice(_0x3b38df.indexOf(_0x49867d), 1);
                    _0x5e4385.writeFileSync(dataPending, JSON.stringify(_0x3b38df, null, 2));
                  }, _0xd078af);
                }
              });
            }
          }
        }
      }
    }
  }
};
