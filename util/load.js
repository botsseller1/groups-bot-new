const fs = require("fs");

module.exports = bot => {
  bot.servers = ["633656826730250270"];
  bot.commands = [];
  bot.chs = { active: "691758221651869797", not: "691758344620212335" };

  fs.readdir("./events", (err, files) => {
    if (err) return console.error(err);
    files
      .filter(file => file.endsWith(".js"))
      .map(file => {
        let event = require("../events/" + file);
        bot.on(file.split(".")[0], (...args) => event(bot, ...args));
      });
  });

  fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files
      .filter(cmd => cmd.endsWith(".js"))
      .map(cmd => {
        let command = require(`../commands/${cmd}`);
        bot.commands.push(command);
      });
  });
};
