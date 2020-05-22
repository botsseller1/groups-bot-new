module.exports = {
    aliases: ["rank"],
    description: "See your clan rank.",
    usage: "< clan name >",
    category: "info",
    run: async message => {
      if (!message.args[0]) return message.channel.send("> :clipboard: يرجى كتابة أسم الكلان !");
      let clan = message.client.db.filter(c => c.name).find(c => c.name.toLowerCase() == message.args.join(" ").toLowerCase());
      if (!clan) return message.channel.send("> :x: لم يتم العثور على كلان بـ هذا الأسم !");
      if (!clan.activated) return message.channel.send("> :x: هذا الكلان غير مفعل !");
      
      let clans = message.client.db.filter(c => c.name).array();
      let sorted = clans.sort((a, b) => b.level - a.level);
      let rank = sorted.map(c => c.name).indexOf(clan.name) + 1;
      let total = 1500 * (Math.pow(2, clan.level) - 1);
      
      let embed = new(require("discord.js")).RichEmbed()
        .setAuthor(clan.name, message.guild.iconURL)
        .setColor(message.member.displayColor)
        .setDescription(`>>> **CLAN XP**: ${clan.xp || 0} / ${total}\n**CLAN Rank**: ${rank || 1}\n**CLAN Level**: ${clan.level || 1}`)
        .setFooter(message.author.tag, message.author.avatarURL);

        
      await message.channel.send(embed);
    }
}