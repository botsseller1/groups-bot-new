module.exports = {
  aliases: ["leave"],
  description: "Leave a clan",
  usage: "",
  category: "clans",
  run: async message => {
    let clan = message.client.db.filter(c => c.name).find(c => c.members.map(m => m.id).includes(message.author.id));
    if (!clan) return message.channel.send("> :x: انت غير موجود في أي كلان !");
    if (!clan.activated) return message.channel.send("> :x: هذا الكلان غير مفعل !");

    if (clan.owner == message.author.id) return message.channel.send("> :x: لا يمكنك الخروج من كلانك !");
    let member = clan.members.find(m => m.id == message.author.id);
    if (!member) return message.channel.send("> :x: انت غير موجود في أي كلان !");

    let role = message.guild.roles.find(r => r.name == "Clan | " + clan.name);
    if (role) await message.member.removeRole(role.id);
    await message.client.db.set(clan.name, clan.members.filter(m => m.id != message.author.id), "members");
    await message.react("✅");
  }
};
