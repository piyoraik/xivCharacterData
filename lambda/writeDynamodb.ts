import { Handler } from "aws-lambda";
import * as AWS from "aws-sdk";
import { characterJobLevel } from "./function/characterJobLevel";
import { fetchCharacterData } from "./function/fetchCharacterData";

const db = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TABLE_NAME || "";
const BASE_URL = "https://xivapi.com/character";

export const handler: Handler = async () => {
  const today = new Date();

  const xivCharacters = ["30139186", "42940731", "42908956", "42898572"];

  for (const xivCharacter of xivCharacters) {
    const character = await fetchCharacterData(xivCharacter, BASE_URL);
    const characterLevel = characterJobLevel(character.ClassJobs);

    const params = {
      TableName: TABLE_NAME,
      Item: {
        name: character.Name,
        date: `${today.getMonth()}/${today.getDate()}`,
        ...characterLevel,
      },
    };

    try {
      const response = await db.put(params).promise();
      console.log(response);
    } catch (dbError) {
      console.log(dbError);
    }
  }
};
