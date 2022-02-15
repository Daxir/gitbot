import "dotenv/config";
import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

const token = process.env.API_KEY;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const commands = [
  new SlashCommandBuilder()
    .setName("snoop")
    .setDescription("Checks user activity on GitHub")
    .addStringOption((option) =>
      option
        .setName("username")
        .setDescription("GitHub username")
        .setRequired(true)
    ),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(token);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log("Successfully registered commands"))
  .catch(console.error);
