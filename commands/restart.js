const cp = require("child_process");
const { RichEmbed } = require("discord.js");

module.exports = {
  aliases: ["restart", "ريستارت"],
  description: "Restarts the bot",
  usage: "",
  category: "core",
  run: async message => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return null;

    await message.channel.send(`> **${message.guild.name}** | إعادة التشغيل\nجاري اعادة تشغيل البوت ..`);
    await cp.exec("refresh");
  }
};
