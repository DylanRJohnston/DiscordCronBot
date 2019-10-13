import "dotenv/config";
import * as t from "io-ts";
import { validate } from "./validate";

interface ENV_TYPE extends t.TypeOf<typeof ENV_TYPE> {}
const ENV_TYPE = t.type({
  WEBHOOK_ID: t.string,
  WEBHOOK_TOKEN: t.string,
  MESSAGE: t.string,
  CRON_HOUR: t.string,
  CRON_MINUTE: t.string,
  APP_NAME: t.string
});

export const ENV: ENV_TYPE = validate(ENV_TYPE)(process.env);
