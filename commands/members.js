module.exports = {
  aliases: ["members"],
  description: "Displays your clan members",
  usage: "",
  category: "clans",
  run: async message => {
    let clan = message.client.db.filter(c => c.name).find(c => c.members.map(m => m.id).includes(message.author.id) || c.name.toLowerCase() == message.args.join(' ').toLowerCase());
    if (!clan) return message.channel.send("> :x: انت غير موجود في أي كلان !");

    await message.channel.send({
      embed: {
        title: clan.name,
        author: { name: "Clan Members", icon_url: message.guild.iconURL },
        description: clan.members.map(m => message.guild.members.get(m.id) || m.id).join('\n'),
        footer: { text: message.author.tag, icon_url: message.author.avatarURL }
      }
    });
  }
};
