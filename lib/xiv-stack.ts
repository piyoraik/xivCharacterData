import {
  Stack,
  StackProps,
  aws_lambda_nodejs as lambda,
  Duration,
} from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export class XivStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new lambda.NodejsFunction(this, "xivCharacterData", {
      entry: "lambda/index.ts",
      handler: "handler",
      runtime: Runtime.NODEJS_14_X,
      // timeout: Duration.minutes(20),
    });
  }
}
