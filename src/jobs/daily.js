import { CronJob } from "cron";
import { snoop } from "../commands/snoop.js";

export const initDailyJob = (channel) => {
  const job = new CronJob("30 9 * * *", async () => {
    const message = await snoop("picubicu");
    await channel.send(message);
  });
  job.start();
};
