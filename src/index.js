import "dotenv/config";
import { Client, Intents } from "discord.js";
import { snoop } from "./commands/snoop.js";
import { initDailyJob } from "./jobs/daily.js";

const token = process.env.API_KEY;
const dailyChannelId = process.env.DAILY_CHANNEL_ID;
const client = new Client({
  intents: [Intents.FLAGS.GUILDS],
});

client.once("ready", async () => {
  const channel = await client.channels.fetch(dailyChannelId);
  initDailyJob(channel);
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
