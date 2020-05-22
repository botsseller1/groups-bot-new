module.exports = async client => {
  await console.log("Logged in as " + client.user.tag);
  await client.db.defer;

  let game = client.db.get("settings", "game");
  if (game.name) await client.user.setActivity(game.name, { type: game.type || "PLAYING", url: "https://twitch.tv/julianxdark" });

  await setInterval(async () => {
    let guild = client.guilds.get(client.servers[0]);
    
    
    for (let clan of client.db.filter(c => c.activated)) {
      
      clan = clan[1];
      for (let member of clan.members) {
        let mem = guild.members.get(member.id);
        if (mem && mem.voiceChannelID && mem.voiceChannel.name === clan.name) await client.db.math(clan.name, 'add', Math.floor(Math.random() * 5), 'xp');
      }
      
      let total = 1500 * (Math.pow(2, clan.level) - 1);
      if (clan.xp >= total) await client.db.math(clan.name, "add", 1, "level");
    }
  }, 1 * 60 * 1000);
};