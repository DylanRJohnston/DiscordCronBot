import { App } from "@aws-cdk/core";
import { LambdaCron } from "./lib/LambdaCron";
import { join } from "path";
import { ENV } from "./lib/Env";
import { Event } from "./lambdas/discord";

const app = new App();

new LambdaCron<Event>(app, ENV.APP_NAME, {
  arguments: {
    webhookId: ENV.WEBHOOK_ID,
    webhookToken: ENV.WEBHOOK_TOKEN,
    payload: {
      content: ENV.MESSAGE
    }
  },
  path: join(__dirname, "./lambdas"),
  handler: "discord.main",
  schedule: {
    hour: ENV.CRON_HOUR,
    minute: ENV.CRON_MINUTE
  }
});
