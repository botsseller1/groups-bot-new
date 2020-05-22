module.exports = {
  aliases: ["stats", "info"],
  description: "Get info about your/a clan",
  usage: "",
  category: "clans",
  run: async message => {
    let clan = message.client.db.filter(c => c.name).find(c => c.members.map(m => m.id).includes(message.author.id) || c.name.toLowerCase() == message.args.join(' ').toLowerCase());
    if (!clan) return message.channel.send("> :x: انت غير موجود في أي كلان !");
    let admins = clan.members.filter(c => c.role == "admin" || c.role == "co-owner" || c.role == "owner").map(a => Object({ role: a.role, member: message.guild.members.get(a.id) }));

    await message.channel.send({
      embed: {
        title: clan.name,
        author: { name: "Clan Info", icon_url: message.guild.iconURL },
        fields: [
          {
            name: "General Info",
            value: `Name: ${clan.name}\nMembers: ${clan.members.length}\nOwner: <@${clan.owner}>\nCreated At: ${new Date(clan.createdAt).toLocaleString()}\nActivated: ${clan.activated ? "Yes" : "No"}`,
            inline: true
          }, {
            name: "Admins [" + admins.length + "]",
            value: admins.map(a => `${a.member} | \`${a.role}\``).join("\n"),
            inline: true
          }
        ],
        footer: { text: message.author.tag, icon_url: message.author.avatarURL }
      }
    });
  }
};
