const { Client } = require("discord.js");
const client = new Client({ disableEveryone: true });
const load = require("./util/load");
const app = require("express")();

const Enmap = require("enmap");
client.db = new Enmap({ name: "db", dataDir: "./.data" });
client.db.ensure("settings", { prefix: ".", game: { name: null, type: "PLAYING" } });

load(client);
client.login(process.env.TOKEN);

app.get("/", (_, r) => r.sendStatus(200)).listen(process.env.PORT || 3000);

process.on("unhandledRejection", error => {
  console.error(error.stack || error);
});
process.on("uncaughtException", error => {
  console.error(error);
  process.exit(1);
});
process.on("warn", warn => {
  console.warn(warn);
});