import { Room, User } from "../models";
import { patchApi, postApi, SERVER_URL } from "./api";

const BASE_URL = '/teams';

const post = postApi(BASE_URL);

export const createTeam = async ({name, user, room}: {name: string, user: User, room: Room}) => await post({name, userId: user.id, roomId: room.id});

export const GET_TEAM_BY_ID_URL = `${SERVER_URL + BASE_URL}/`

const patch = patchApi(BASE_URL);

export const changeUserTeam = async (userId: string, teamId: string, roomId: string) => await patch({userId, teamId, roomId});