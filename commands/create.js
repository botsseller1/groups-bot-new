module.exports = {
  aliases: ["create", "new"],
  description: "أنشاء كلان",
  usage: "< name >",
  category: "clans",
  run: async message => {
    if (message.client.db.filter(c => c.name).find(c => c.members.map(m => m.id).includes(message.author.id) || c.owner == message.author.id))
      return message.channel.send("> :x: انت بالفعل موجود بـ كلان !");
    if (!message.args[0]) return message.channel.send("> :clipboard: يرجى كتابة أسم الكلان بعد الأمر");
    if (message.args.join(" ").length > 32) return message.channel.send("> :x: لا يمكن لأسم الكلان أن يكون أكثر من 32 حرف !");
    if (message.args.join(" ").toLowerCase() == "settings") throw Error();
    if (message.client.db.get(message.args.join(" ")) || message.client.db.filter(c => c.name).find(c => c.name.toLowerCase() == message.args.join(" ").toLowerCase())) 
      return message.channel.send("> :x: يوجد كلان بـ هذا الأسم بالفعل !");
    
    let msg = await message.channel.send("> 🔁 **جارِ صنع الكلان** .. انتظر قليًلا من فضلك");
    let channel = await message.guild.createChannel(message.args.join(" ").replace(/discord.gg/g, ""), { type: "voice", parent: message.client.chs.not });
    await message.client.db.set(message.args.join(" "), {
      name: message.args.join(" "),
      members: [{ id: message.author.id, role: "owner" }],
      invites: [],
      owner: message.author.id,
      level: 1, xp: 0,
      createdAt: Date.now(),
      activated: false
    });
    await msg.edit("> :white_check_mark: **تم صنع الكلان بنجاح** لكن..\nالكلان غير رسمي , مما يعني انه غير مفعل ، شروط التفعيل لـ يصبح كلان رسمي :\nأن يدخل 5 أعضاء لـرومك الصوتي وسيتم التفعيل تلقائيًأ\n> الروم الصوتي الخاص بالـ كلان : " + channel); 
  }
};
