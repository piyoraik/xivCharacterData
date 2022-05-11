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
import { PythonFunction } from "@aws-cdk/aws-lambda-python-alpha";
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
          AZ: "Asia/Tokyo",
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
          AZ: "Asia/Tokyo",
        },
        onSuccess: new LambdaDestination(readLambdaFunction, {}),
      }
    );

    const samplePythonLambdaFunction = new PythonFunction(
      this,
      "samplePythonFunction",
      {
        runtime: Runtime.PYTHON_3_9,
        handler: "handler",
        entry: "python",
        environment: {
          AZ: "Asia/Tokyo",
        },
      }
    );

    dynamoTable.grantReadWriteData(writeLambdaFunction);
    dynamoTable.grantReadData(readLambdaFunction);
    dynamoTable.grantReadData(samplePythonLambdaFunction);

    const fetchLambdaRule = new Rule(this, "fetchLambdaRule", {
      ruleName: "fetchLambdaRule",
      schedule: Schedule.cron({ minute: "0", hour: "15" }),
      targets: [new LambdaFunction(writeLambdaFunction)],
    });
  }
}
