import { App } from "@aws-cdk/core"
import { LambdaCron } from "./stacks/LambdaCron"
import { join } from "path"
import { ENV } from "./lib/Env"
import { Event } from "./lambdas/discord"

const app = new App()

new LambdaCron<Event>(app, ENV.APP_NAME, {
  arguments: {
    webhookId: ENV.WEBHOOK_ID,
    webhookToken: ENV.WEBHOOK_TOKEN,
    payload: {
      content: ENV.MESSAGE,
    },
  },
  path: join(__dirname, "./lambdas"),
  handler: "discord.main",
  schedule: {
    day: ENV.CRON_DAY,
    hour: ENV.CRON_HOUR,
    minute: ENV.CRON_MINUTE,
    month: ENV.CRON_MONTH,
    weekDay: ENV.CRON_WEEKDAY,
    year: ENV.CRON_YEAR,
  },
})
