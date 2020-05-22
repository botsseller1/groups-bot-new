const { RichEmbed } = require("discord.js");

module.exports = {
  aliases: ["help", "commands", "مساعدة"],
  description: "Shows the bot commands",
  usage: "",
  category: "core",
  run: async message => {
      let me = await message.client.fetchUser("625383523905175622");
      me = me.tag;
      let categories = ["core", "clans", "info", "admin"];
      if (categories.includes(message.args[0])) categories = [message.args[0]];
      let commands = category => {
        return message.client.commands
          .filter(cmd => cmd.category === category)
          .map(cmd => ` \`${message.prefix + cmd.aliases[0]}\`${categories.length == 1 ? ` - **${cmd.description || "4Sky"}**` : ""}`)
          .join("\n");
      };
    
      let text = `> **${message.guild.name}** | قائمة المساعدة`;
      for (let i = 0; i < categories.length; i++) {
        text += `\n**${categories[i].charAt(0).toUpperCase() + categories[i].slice(1)} Commands**\n${commands(categories[i])}`;
      }

      await message.channel.send(text);
  }
};