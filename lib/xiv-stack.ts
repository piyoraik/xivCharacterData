import {
  Stack,
  StackProps,
  aws_lambda_nodejs as lambda,
  aws_dynamodb as dynamodb,
  Duration,
} from "aws-cdk-lib";
import { Rule, Schedule } from "aws-cdk-lib/aws-events";
import { LambdaFunction } from "aws-cdk-lib/aws-events-targets";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { LambdaDestination } from "aws-cdk-lib/aws-lambda-destinations";
import { Construct } from "constructs";

export class XivStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const dynamoTable = new dynamodb.Table(this, "xivTable", {
      partitionKey: { name: "date", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "name", type: dynamodb.AttributeType.STRING },
    });

    const readLambdaFunction = new lambda.NodejsFunction(
      this,
      "readXivCharacterData",
      {
        entry: "lambda/readDynamodb.ts",
        handler: "handler",
        runtime: Runtime.NODEJS_14_X,
        timeout: Duration.seconds(60),
        environment: {
          TABLE_NAME: dynamoTable.tableName,
        },
      }
    );

    const writeLambdaFunction = new lambda.NodejsFunction(
      this,
      "fetchXivCharacterData",
      {
        entry: "lambda/writeDynamodb.ts",
        handler: "handler",
        runtime: Runtime.NODEJS_14_X,
        timeout: Duration.seconds(60),
        environment: {
          TABLE_NAME: dynamoTable.tableName,
        },
        onSuccess: new LambdaDestination(readLambdaFunction, {}),
      }
    );

    dynamoTable.grantReadWriteData(writeLambdaFunction);
    dynamoTable.grantReadData(readLambdaFunction);

    const fetchLambdaRule = new Rule(this, "fetchLambdaRule", {
      ruleName: "fetchLambdaRule",
      schedule: Schedule.cron({ minute: "0", hour: "15" }),
      targets: [new LambdaFunction(writeLambdaFunction)],
    });
  }
}
