import { Handler } from "aws-lambda";
import * as AWS from "aws-sdk";

const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || "";

export const handler: Handler = async () => {
  const today = new Date();
  const todayMonthDay = `${today.getMonth()}/${today.getDate()}`;

  const params = {
    TableName: TABLE_NAME,
    KeyConditionExpression: "#dt = :mmdd",
    ExpressionAttributeNames: {
      "#dt": "date",
    },
    ExpressionAttributeValues: {
      ":mmdd": todayMonthDay,
    },
  };

  try {
    const response = await db.query(params).promise();
    console.log("-----------");
    console.log(response);
    console.log("-----------");
  } catch (dbError) {
    console.log(dbError);
  }
};
