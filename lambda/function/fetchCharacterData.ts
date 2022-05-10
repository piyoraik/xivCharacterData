import axios, { AxiosResponse } from "axios";
import { Character } from "../types/character.types";

export const fetchCharacterData = async (characterCode: string, url: string) =>
  await axios
    .get(`${url}/${characterCode}`)
    .then((res: AxiosResponse<Character>) => {
      return res.data.Character;
    })
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        throw new Error(err.message);
      }
      throw new Error("予期せぬエラーが発生しました。");
    });
