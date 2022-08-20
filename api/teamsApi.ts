import { patchApi, postApi, SERVER_URL } from "./api";

const BASE_URL = "/teams";

const post = postApi(BASE_URL);

export const createNewTeam = async ({
  name,
  userId,
  roomId,
}: {
  name: string;
  userId: string;
  roomId: string;
}) => post({ name, userId, roomId }) as Promise<string>;

export const GET_TEAM_BY_ID_URL = `${SERVER_URL + BASE_URL}/`;

const patch = patchApi(BASE_URL);

export const leaveTeam = async ({
  userId,
  teamId,
  roomId,
}: {
  userId: string;
  teamId: string;
  roomId: string;
}) => await patch({ path: "/leave", payload: { userId, teamId, roomId } });

export const joinTeam = async ({
  userId,
  teamId,
  roomId,
}: {
  userId: string;
  teamId: string;
  roomId: string;
}) => await patch({ path: "/join", payload: { userId, teamId, roomId } });
