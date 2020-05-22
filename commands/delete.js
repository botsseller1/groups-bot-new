module.exports = {
  aliases: ["delete"],
  description: "Delete your clan",
  usage: "",
  category: "clans",
  run: async message => {
    let clan = message.client.db.filter(c => c.name).find(c => c.owner == message.author.id);
    if (!clan) return message.channel.send("> :x: انت لا تملك كلان !");
    
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
