export interface ClassJob {
  ClassID: number;
  ExpLevel: number;
  ExpLevelMax: number;
  ExpLevelTogo: number;
  IsSpecialised: boolean;
  JobID: number;
  Level: number;
  Name:
    | "gladiator / paladin"
    | "marauder / warrior"
    | "dark knight / dark knight"
    | "gunbreaker / gunbreaker"
    | "conjurer / white mage"
    | "arcanist / scholar"
    | "astrologian / astrologian"
    | "sage / sage"
    | "pugilist / monk"
    | "lancer / dragoon"
    | "rogue / ninja"
    | "samurai / samurai"
    | "reaper / reaper"
    | "archer / bard"
    | "machinist / machinist"
    | "dancer / dancer"
    | "thaumaturge / black mage"
    | "arcanist / summoner"
    | "red mage / red mage"
    | "blue mage / blue mage"
    | "carpenter / carpenter"
    | "blacksmith / blacksmith"
    | "armorer / armorer"
    | "goldsmith / goldsmith"
    | "leatherworker / leatherworker"
    | "weaver / weaver"
    | "alchemist / alchemist"
    | "culinarian / culinarian"
    | "miner / miner"
    | "botanist / botanist"
    | "fisher / fisher";
  UnlockedState: {
    ID: number;
    Name: string;
  };
}
