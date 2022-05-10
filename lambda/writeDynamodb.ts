import { Handler } from "aws-lambda";
import * as AWS from "aws-sdk";
import { characterJobLevel } from "./function/characterJobLevel";
import { fetchCharacterData } from "./function/fetchCharacterData";

const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || "";
const BASE_URL = "https://xivapi.com/character";

export const handler: Handler = async () => {
  const today = new Date();

  const xivCharacter = {
    piyo: "30139186",
    rinta: "42940731",
    nonsugar: "42908956",
    misa: "42898572",
  };

  const piyo = await fetchCharacterData(xivCharacter.piyo, BASE_URL);
  const piyoJobLevel = characterJobLevel(piyo.ClassJobs);

  const params = {
    TableName: TABLE_NAME,
    Item: {
      name: piyo.Name,
      date: `${today.getMonth()}/${today.getDate()}`,
      ...piyoJobLevel,
    },
  };

  try {
    const response = await db.put(params).promise();
    console.log(response);
  } catch (dbError) {
    console.log(dbError);
  }
};
