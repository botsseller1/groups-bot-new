module.exports = (client, guild) => {
  if (!client.servers.includes(guild.id)) guild.leave();
};