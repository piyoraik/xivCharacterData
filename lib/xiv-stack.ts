import {
  Stack,
  StackProps,
  aws_lambda_nodejs as lambda,
  aws_dynamodb as dynamodb,
} from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export class XivStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const dynamoTable = new dynamodb.Table(this, "xivTable", {
      partitionKey: { name: "name", type: dynamodb.AttributeType.STRING },
    });

    const writeLambdaFunction = new lambda.NodejsFunction(
      this,
      "fetchXivCharacterData",
      {
        entry: "lambda/writeDynamodb.ts",
        handler: "handler",
        runtime: Runtime.NODEJS_14_X,
        environment: {
          TABLE_NAME: dynamoTable.tableName,
        },
      }
    );

    const readLambdaFunction = new lambda.NodejsFunction(
      this,
      "readXivCharacterData",
      {
        entry: "lambda/readDynamodb.ts",
        handler: "handler",
        runtime: Runtime.NODEJS_14_X,
        environment: {
          TABLE_NAME: dynamoTable.tableName,
        },
      }
    );

    dynamoTable.grantReadWriteData(writeLambdaFunction);
    dynamoTable.grantReadData(readLambdaFunction)
  }
}
