module.exports = {
  aliases: ['eval'],
  description: "",
  usage: "< code >",
  category: "owner",
  run: async message => {
    if (message.author.id !== '325130943025119233') return;
    
    try {
      let evaled = eval(message.args.join(' '));
      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
 
      await message.channel.send(`${evaled}`);
    } catch (error) {
      await message.channel.send(error.message || error, { code: 'xl' });
    }
  }
};