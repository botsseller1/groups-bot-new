const { RichEmbed } = require("discord.js");

module.exports = {
  aliases: ["settings"],
  description: "Control the bot",
  usage: " < setname | setavatar | setprefix | setstatus > ",
  category: "admin",
  run: async message => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return null;
    
    switch (message.args[0]) {
      case "setname":
        if (!message.args[1]) return message.channel.send(`> **Usage**: ${message.prefix}settings setname < username >`);
        try {
          await message.client.user.setUsername(message.args.slice(1).join(" "));
          await message.react("✅");
        } catch (err) {
          await console.error(err);
          await message.react("❌");
        }
        break;
      case "setavatar":
        if (!message.args[1] && !message.attachments.first()) return message.channel.send(`> **Usage**: ${message.prefix}settings setavatar < avatar link >`);
        if (message.attachments.first() && message.attachments.first().height) message.args[1] = message.attachments.first().url;
        if (!message.args[1]) return message.channel.send(`> **Usage**: ${message.prefix}settings setavatar < avatar link >`);
        
        try {
          await message.client.user.setAvatar(message.args[1]);
          await message.react("✅");
        } catch (err) {
          await console.error(err);
          await message.react("❌");
        }
        break;
      case "setprefix":
        if (!message.args[1]) return message.channel.send(`> **Usage**: ${message.prefix}settings setprefix < new prefix >`);
        if (message.args[1].length > 10) return message.channel.send(":x:, **Prefix length cannot be more than 10**!");
        try {
          await message.client.db.set("settings", message.args[1], "prefix");
          await message.react("✅");
        } catch (err) {
          await console.error(err);
          await message.react("❌");
        }
        break;
      case "setstatus":
        if (!message.args[1] || !message.args[2]) return message.channel.send(`> **Usage**: ${message.prefix}settings setstatus < playing | listening | watching | streaming > < game >`);
        if (!["playing", "listening", "watching", "streaming"].includes(message.args[1].toLowerCase())) return message.channel.send(":x:, **The game type must be one of**: `< playing | listening | watching | streaming >`");
        
        try {
          await message.client.user.setActivity(message.args.slice(2).join(" "), { type: message.args[1].toUpperCase(), url : "https://twitch.tv/julianxdark" });
          await message.client.db.set("settings", { name: message.args.slice(2).join(" "), type: message.args[1].toUpperCase() }, "game");
          await message.react("✅");
        } catch (err) {
          await console.error(err);
          await message.react("❌");
        }
        break;
      default:
        let settings = message.client.db.get("settings");
        await message.channel.send(
          new RichEmbed()
            .setColor("GREEN")
            .setAuthor(message.client.user.tag, message.client.user.avatarURL)
            .setThumbnail(message.client.user.avatarURL)
            .addField("Name", `${message.prefix}settings setname [username]`, true)
            .addField("Avatar", `${message.prefix}settings setavatar [avatar]`, true)
            .addField("Prefix", `${message.prefix}settings setprefix [new prefix]`, true)
            .addField("Status/Game", `${message.prefix}settings setstatus < playing | listening | watching | streaming > [game]`, false)
            .setFooter(message.guild.name, message.guild.iconURL)
            .setTimestamp()
        );
    }
  }
};
