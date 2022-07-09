export type User = {
  id: string;
  name: string;
  teamId?: string;
};

export type Team = {
  id: string,
  name: string;
  members: User;
};

export type Room = {
  id: string;
  name: string;
  teams: Team[];
  participantCount?: number;
};

export type Guess = {
  word: string,
  score: number,
  rank: number,
  owner: string,
  team: string
  serialNumber: number,
}
