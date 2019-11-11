import * as cdk from "@aws-cdk/core"
import * as lambda from "@aws-cdk/aws-lambda"
import * as events from "@aws-cdk/aws-events"
import * as targets from "@aws-cdk/aws-events-targets"

interface Props<P> {
  path: string
  handler: string
  arguments: P
  schedule: events.CronOptions
}

export class LambdaCron<P> extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: Props<P>) {
    super(scope, id)

    new events.Rule(this, "Timer", {
      schedule: events.Schedule.cron(props.schedule),
      targets: [
        new targets.LambdaFunction(
          new lambda.Function(this, "Trigger", {
            runtime: lambda.Runtime.NODEJS_10_X,
            code: lambda.Code.fromAsset(props.path),
            handler: props.handler,
          }),
          {
            event: events.RuleTargetInput.fromObject(props.arguments),
          },
        ),
      ],
    })
  }
}
