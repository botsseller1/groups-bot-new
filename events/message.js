module.exports = async (client, message) => {
  if (!message.guild || message.author.bot || !client.servers.includes(message.guild.id)) return null;
  
  message.prefix = client.db.get("settings", "prefix") || ".";
  let args = message.content.split(" ");
  let cmd = args[0].slice(message.prefix.length);
  args = args.slice(1);
  message.args = args;

  if (!message.content.startsWith(message.prefix)) return null;
  let command = client.commands.find(c => c.aliases.includes(cmd));
  if (!command) return null;

  try {
    await command.run(message);
  } catch (error) {
    await console.error(error);
    await message.channel.send(`:x:, **Error**!`);
  }
};
