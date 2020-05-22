const random = require("randomstring");

module.exports = {
  aliases: ["invite"],
  description: "Invite a member to your clan",
  usage: "< @member >",
  category: "clans",
  run: async message => {
    let clan = message.client.db.filter(c => c.name).find(c => c.owner == message.author.id || c.members.find(m => m.id == message.author.id && (m.role == "co-owner" || m.role == "admin")));
    if (!clan) return message.channel.send("> :x: انت لست إداري في أي كلان !");
    if (!clan.activated) return message.channel.send("> :x: هذا الكلان غير مفعل !");
    
    if (!message.args[0]) return message.channel.send("> :clipboard: يجب منشن العضو !");
    let member = message.mentions.members.first();
    if (!member) return message.channel.send("> :x: لا يمكنني العثور لا على هذا العضو !");
    if (message.client.db.filter(c => c.name).find(c => c.members.find(c => c.id == member.user.id))) return message.channel.send("> :x: هذا العضو موجود بـ كلان بالفعل !");
    
    let stop = false
    try {
      await member.send(`> **${message.guild.name}** | الكلانات\nتم دعوتك لـ كلان \`${clan.name}\``);
    } catch (_) {
      stop = true;
      return message.channel.send("> :x: تعذر ارسال رسالة لـ هذا العضو على الخاص");
    }
    if (stop) return message.channel.send("> :x: تعذر ارسال رسالة لـ هذا العضو على الخاص");
    let code = random.generate(7);
    if (message.client.db.get(clan.name, "invites").includes(code)) code = random.generate(8);
    await message.client.db.push(clan.name, code, "invites");
    
    await member.send(`لقبول الدعوة ودخول الكلان قم بكتابة الأمر التالي في السيرفر :\n> ${message.prefix}accept ${code}`);
    await message.channel.send("> :white_check_mark: تم أرسال الدعوة بنجاح :)");
  }
};