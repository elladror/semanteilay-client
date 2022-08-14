export type User = {
  id: string;
  name: string;
  teamId?: string;
};

export type Team = {
  id: string;
  name: string;
  members: User;
};

export type Room = {
  id: string;
  name: string;
  teams: (Team & {
    _count?: {
      members: number;
      guesses: number;
    };
  })[];
};

export type Guess = {
  id: string;
  word: string;
  score: number;
  rank: number;
  owner: string;
  team: string;
  serialNumber: number;
};

export type GuessCreationInput = {
  word: string;
  ownerId: string;
  teamId: string;
};
