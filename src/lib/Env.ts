import "dotenv/config"
import * as t from "io-ts"
import { validate } from "./validate"

interface ENV_TYPE extends t.TypeOf<typeof ENV_TYPE> {}
const ENV_TYPE = t.intersection([
  t.type({
    APP_NAME: t.string,
    MESSAGE: t.string,
    WEBHOOK_ID: t.string,
    WEBHOOK_TOKEN: t.string,
  }),
  t.partial({
    CRON_DAY: t.string,
    CRON_HOUR: t.string,
    CRON_MINUTE: t.string,
    CRON_MONTH: t.string,
    CRON_WEEKDAY: t.string,
    CRON_YEAR: t.string,
  }),
])

export const ENV: ENV_TYPE = validate(ENV_TYPE)(process.env)
