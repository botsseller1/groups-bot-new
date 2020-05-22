module.exports = {
  aliases: ["kick"],
  description: "Kick a member from your clan",
  usage: "< @member >",
  category: "clans",
  run: async message => {
    let clan = message.client.db.filter(c => c.name).find(c => c.owner == message.author.id || c.members.find(m => m.id == message.author.id && (m.role == "co-owner" || m.role == "admin")));
    if (!clan) return message.channel.send("> :x: انت لست إداري في أي كلان !");
    if (!clan.activated) return message.channel.send("> :x: هذا الكلان غير مفعل !");
    
    if (!message.args[0]) return message.channel.send("> :clipboard: يجب منشن العضو !");
    let member = message.mentions.members.first();
    if (!member) return message.channel.send("> :x: لا يمكنني العثور لا على هذا العضو !");
    if (!message.client.db.filter(c => c.name).find(c => c.members.find(c => c.id == member.user.id))) return message.channel.send("> :x: هذا العضو غير موجود بالكلان !");
    if (clan.members.find(m => m.id == member.user.id && (m.role == "owner" || m.role == "co-owner" || m.role == "admin")) && clan.owner != message.author.id)
      return message.channel.send("> :x: لا يمكنك طرد أداري من الكلان !");
    
    let role = message.guild.roles.find(r => r.name == "Clan | " + clan.name);
    if (role) await message.member.removeRole(role.id);
    await message.client.db.set(clan.name, clan.members.filter(m => m.id != member.user.id), "members");
    await message.react("✅");
  }
};
