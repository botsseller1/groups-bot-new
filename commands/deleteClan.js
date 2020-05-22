module.exports = {
  aliases: ["deleteClan"],
  description: "Delete a clan",
  usage: "< clan name >",
  category: "admin",
  run: async message => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return undefined;
    if (!message.args[0]) return message.channel.send(`> :clipboard: ${message.prefix}deleteClan [name]`);
    
    let clan = message.client.db.filter(c => c.name).find(c => c.name.toLowerCase() == message.args.join(" ").toLowerCase());
    if (!clan) return message.channel.send("> :x: لم يتم العثور على كلان بـ هذا الأسم !");
    
    let mm = await message.channel.send("> أتريد حقاً حذف الكلان**؟ للتأكيد اكتب** :\n```تأكيد```\n");
    let filter = m => m.author.id == message.author.id && (m.content == "تاكيد" || m.content == "تأكيد");
    let col = await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ["time"] });
    let msg = await message.channel.send("> :repeat: جارِ حذف الكلان ..");
    let ch = message.guild.channels.find(c => (c.parentID == message.client.chs.not || c.parentID == message.client.chs.active) && c.name == clan.name);
    if (ch) await ch.delete();
    let role = message.guild.roles.find(r => r.name == "Clan | " + clan.name);
    if (role) await role.delete();
    try {
      col.first().delete();
      col.delete();
      mm.delete();
    } catch (_) {}
    await message.client.db.delete(clan.name);
    await msg.edit("> :white_check_mark: تم حذف الكلان بنجاح !");
  }
};
