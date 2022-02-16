import { CronJob } from "cron";
import { snoop } from "../commands/snoop.js";
import "dotenv/config";

const nickname = process.env.DAILY_GITHUB_NICKNAME;
const id = process.env.DAILY_DISCORD_ID;

export const initDailyJob = (channel) => {
  const job = new CronJob("30 9 * * *", async () => {
    const message = await snoop(nickname);
    await channel.send(`<@${id}>`);
    await channel.send(message);
  });
  job.start();
};
