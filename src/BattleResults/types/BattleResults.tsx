import PyNativeParser from "../utils/parser";

export interface PlayerInfo {
  level: number;
  role: string;
  team: number;
  user_name: string;
}

export interface Stats {
  damage: number;
  frags: number;
  deaths: number;
  heal: number;
}

export interface Player {
  player_info: PlayerInfo;
  stats: Stats;
}

export interface Team {
  scores: number;
  players: Record<string, Player>;
}

export interface Common {
  teams: Team[];
}

export interface PlayerInfo {
  level: number;
  role: string;
  team: number;
  user_name: string;
}

export interface Stats {
  damage: number;
  frags: number;
  deaths: number;
  heal: number;
}

export interface Player {
  player_info: PlayerInfo;
  stats: Stats;
}

export interface Team {
  scores: number;
  players: Record<string, Player>;
}

export interface Common {
  teams: Team[];
}
