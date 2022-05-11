import { Handler } from "aws-lambda";
import * as AWS from "aws-sdk";
import axios from "axios";

const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || "";
const DISCORD_URL =
  "https://discord.com/api/webhooks/";

export const handler: Handler = async () => {
  const today = new Date();
  const todayMonthDay = `${today.getMonth()}/${today.getDate()}`;

  const discordPostData = {
    username: "FF14, LevelChecker",
    content: "(｢・ω・)｢ｶﾞｵｰ",
  };

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
    console.log(response);
  } catch (dbError) {
    console.log(dbError);
    throw new Error("エラー");
  }

  await axios.post(DISCORD_URL, discordPostData);
};
