import { Handler } from "aws-lambda";
import axios, { AxiosResponse } from "axios";
import { Character } from "../lib/types/character.types";

export const handler: Handler = async () => {
  const BASE_URL = "https://xivapi.com/character";

  const xivCharacter = {
    piyo: "30139186",
    rinta: "42940731",
    nonsugar: "42908956",
    misa: "42898572",
  };

  const characterData = async (characterCode: string) =>
    await axios
      .get(`${BASE_URL}/${characterCode}`)
      .then((res: AxiosResponse<Character>) => {
        return res.data.Character.ClassJobs;
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          throw new Error(err.message);
        }
        throw new Error("予期せぬエラーが発生しました。");
      });

  const piyoData = await characterData(xivCharacter.piyo);
  console.log(piyoData);
};
