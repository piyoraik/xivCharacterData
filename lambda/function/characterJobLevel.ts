import { ClassJob } from "../types/chassJob.types";

export const characterJobLevel = (data: ClassJob[]) => {
  const jobLevel = {
    paladin: 0,
    warrior: 0,
    darkKnight: 0,
    gunbreaker: 0,
    whiteMage: 0,
    scholar: 0,
    astrologian: 0,
    sage: 0,
    monk: 0,
    dragoon: 0,
    ninja: 0,
    samurai: 0,
    reaper: 0,
    bard: 0,
    machinist: 0,
    dancer: 0,
    blackMage: 0,
    summoner: 0,
    redMage: 0,
    blueMage: 0,
  };

  for (const classJob of data) {
    switch (classJob.Name) {
      case "gladiator / paladin":
        jobLevel.paladin = classJob.Level;
        break;
      case "marauder / warrior":
        jobLevel.warrior = classJob.Level;
        break;
      case "dark knight / dark knight":
        jobLevel.darkKnight = classJob.Level;
        break;
      case "gunbreaker / gunbreaker":
        jobLevel.gunbreaker = classJob.Level;
        break;
      case "conjurer / white mage":
        jobLevel.whiteMage = classJob.Level;
        break;
      case "arcanist / scholar":
        jobLevel.scholar = classJob.Level;
        break;
      case "astrologian / astrologian":
        jobLevel.astrologian = classJob.Level;
        break;
      case "sage / sage":
        jobLevel.sage = classJob.Level;
        break;
      case "pugilist / monk":
        jobLevel.monk = classJob.Level;
        break;
      case "lancer / dragoon":
        jobLevel.dragoon = classJob.Level;
        break;
      case "rogue / ninja":
        jobLevel.ninja = classJob.Level;
        break;
      case "samurai / samurai":
        jobLevel.samurai = classJob.Level;
        break;
      case "reaper / reaper":
        jobLevel.reaper = classJob.Level;
        break;
      case "archer / bard":
        jobLevel.bard = classJob.Level;
        break;
      case "machinist / machinist":
        jobLevel.machinist = classJob.Level;
        break;
      case "dancer / dancer":
        jobLevel.dancer = classJob.Level;
        break;
      case "thaumaturge / black mage":
        jobLevel.blackMage = classJob.Level;
        break;
      case "arcanist / summoner":
        jobLevel.summoner = classJob.Level;
        break;
      case "red mage / red mage":
        jobLevel.redMage = classJob.Level;
        break;
      case "blue mage / blue mage":
        jobLevel.blueMage = classJob.Level;
        break;
    }
  }

  return jobLevel
};