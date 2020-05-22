module.exports = {
  aliases: ["rename"],
  description: "Change your clan's name",
  usage: "< new name >",
  category: "clans",
  run: async message => {
    let clan = message.client.db.filter(c => c.name).find(c => c.owner == message.author.id || c.members.find(m => m.id == message.author.id && m.role == "co-owner"));
    if (!clan) return message.channel.send("> :x: انت لست إداري في أي كلان !");
  
    if (!message.args[0]) return message.channel.send("> :clipboard: يجب كتابة الأسم الجديد للكلان !");
    if (message.client.db.filter(c => c.name).find(c => c.name.toLowerCase() == message.args.join(" ").toLowerCase()))
      return message.channel.send("> :x: يوجد كلان بـ هذا الأسم بالفعل !");
    if (message.args[0].toLowerCase() == "settings") return message.reply(":x:");
    let msg = await message.channel.send("> :repeat: جارِ تغيير اسم الكلان ..");
    let ch = message.guild.channels.find(c => (c.parentID == message.client.chs.not || c.parentID == message.client.chs.active) && c.name == clan.name);
    if (ch) await ch.setName(message.args.join(" "));
    let role = message.guild.roles.find(r => r.name == "Clan | " + clan.name);
    if (role) await role.setName("Clan | " + message.args.join(" "));
    await message.client.db.delete(clan.name);
    clan.name = message.args.join(" ");
    await message.client.db.set(message.args.join(" "), clan);
    await message.client.db.set(message.args.join(" "), message.args.join(" "), "name");
    await msg.edit("> :white_check_mark: تم تغيير اسم الكلان بنجاح !");
  }
};
