import { ClassJob } from "./chassJob.types";

export interface Character {
  Achievements: null;
  AchievementsPublic: null;
  Character: {
    ActiveClassJob: {
      ClassID: number;
      ExpLevel: number;
      ExpLevelMax: number;
      ExpLevelTogo: number;
      IsSpecialised: boolean;
      JobID: number;
      Level: number;
      Name: string;
      UnlockedState: {
        ID: number;
        Name: string;
      };
    };
    Avatar: string;
    Bio: string;
    ClassJobs: ClassJob[];
    ClassJobsBozjan: {
      Level: null;
      Mettle: null;
      Name: string;
    };
    ClassJobsElemental: {
      ExpLevel: number;
      ExpLevelMax: number;
      ExpLevelTogo: number;
      Level: number;
      Name: string;
    };
    DC: string; // データセンター
    FreeCompanyId: null;
    FreeCompanyName: null;
    GearSet: {
      Attributes: object;
      ClassID: number;
      Gear: object;
      GearKey: string;
      JobID: number; // 現在設定しているキャラクターのジョブ
      Level: number; // 現在設定しているキャラクターのレベル
    };
    Gender: 2;
    GrandCompany: {
      NameID: number;
      RankID: number;
    };
    GuardianDeity: number;
    ID: number;
    Lang: null;
    Name: string; // キャラクターの名前
    Nameday: string;
    ParseDate: 1652079704;
    Portrait: string; // キャラクターの画像
    PvPTeamId: null;
    Race: number;
    Server: string;
    Title: number;
    TitleTop: boolean;
    Town: number;
    Tribe: number;
  };
  FreeCompany: null;
  FreeCompanyMembers: null;
  Friends: null;
  FriendsPublic: null;
  Minions: null;
  Mounts: null;
  PvPTeam: null;
}
