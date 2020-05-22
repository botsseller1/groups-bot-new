const { RichEmbed } = require("discord.js");

module.exports = {
    aliases: ["top", "leaderboard"],
    description: "See the clans leaderboard.",
    usage: "",
    category: "info",
    run: async message => {
      let clans = message.client.db.filter(c => c.name && c.activated).array();
      let sorted = clans.sort((a, b) => b.level - a.level);
      let top = sorted.splice(0, 10);
      let i = 1;
      let text = top.map(clan => `#${i++} | **${clan.name}** LEVEL: \`${clan.level}\``).join("\n");
      
      let embed = new RichEmbed()
        .setAuthor(`${message.guild.name} Clans Leaderboard`, message.guild.iconURL)
        .setThumbnail(message.guild.iconURL ? message.guild.iconURL.replace(".webp", ".png").replace(".jpg", ".png").replace(".jpeg", ".png") : null)
        .setDescription(text == "" ? "No Clans :(" : text)
        .setFooter(message.author.tag, message.author.avatarURL)
        .setTimestamp();

      await message.channel.send(embed);
    }
}