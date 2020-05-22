module.exports = {
  aliases: ["accept"],
  description: "Accept an invite, to join a clan",
  usage: "< invite >",
  category: "clans",
  run: async message => {
    let clan = message.client.db.filter(c => c.name).find(c => c.members.map(m => m.id).includes(message.author.id));
    if (clan) return message.channel.send("> :x: انت بالفعل موجود بـ كلان !");
    let clan2 = message.client.db.filter(c => c.name).find(c => c.invites.find(i => i == message.args[0]));
    if (!clan2) return message.channel.send("> :x: لم يتم العثور على هذه الدعوة !");
    let invite = clan2.invites.find(i => i == message.args[0]);
    
    await message.client.db.remove(clan2.name, invite, "invites");
    await message.client.db.push(clan2.name, { id: message.author.id, role: "member" }, "members");
    let role = message.guild.roles.find(r => r.name == "Clan | " + clan2.name);
    if (role) await message.member.addRole(role.id);
    await message.react("✅");
  }
};
