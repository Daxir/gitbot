import "dotenv/config";
import { Client, Intents } from "discord.js";
import { snoop } from "./commands/snoop.js";
import { initDailyJob } from "./jobs/daily.js";
import { createServer } from "http";

const activities = (function* cycle() {
  while (true) yield* ["GitHub", "GitHub", "GitHub"];
})();

const token = process.env.API_KEY;
const dailyChannelId = process.env.DAILY_CHANNEL_ID;
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES],
});

client.once("ready", async () => {
  createServer((_, res) => {
    res.write("I'm alive");
    res.end();
  }).listen(8080);

  const channel = await client.channels.fetch(dailyChannelId);
  initDailyJob(channel);

  setInterval(
    () =>
      client.user.setActivity(activities.next().value, {
        type: "WATCHING",
      }),
    10000
  );
  console.log("Ready");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;
  switch (commandName) {
    case "snoop": {
      const username = interaction.options.getString("username");
      const result = await snoop(username);
      await interaction.reply(result);
      break;
    }
    default:
      break;
  }
});

client.login(token);
