# DiscordCronBot

A bot for discord that runs on a cron schedule. Uses CDK to deploy a cloudwatch event cron linked to an AWS lambda that fire a payload off to a discord webhook. Why you ask? Because IFTTT doesnt allow fine grained timing of webhooks.

Requires the following env variables.

```
APP_NAME=
WEBHOOK_ID=
WEBHOOK_TOKEN=
MESSAGE=
CRON_HOUR=
CRON_MINUTE=
```
