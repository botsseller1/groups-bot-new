const { RichEmbed } = require("discord.js");

module.exports = {
  aliases: ["ping", "pong"],
  description: "Returns latency and API ping",
  usage: "",
  category: "core",
  run: async message => {
    let msg = await message.channel.send(`**Ping**: \`...\``);
    let ping = Math.floor(msg.createdTimestamp - message.createdTimestamp);

    await msg.edit(`> **${message.guild.name}** | سرعة الأتصال\nPing: ${ping}ms - Websocket: ${Math.floor(message.client.ping)}ms`);
  }
};
