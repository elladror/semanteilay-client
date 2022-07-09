import { deleteApi, getApi, postApi, SERVER_URL } from "./api";

const BASE_URL = "/rooms";
const get = getApi(BASE_URL);
const post = postApi(BASE_URL);
const leave = deleteApi(BASE_URL);

export const createRoom = async (roomName: string) => await post({ roomName });

export const getAllRooms = async () => await get();

export const GET_ALL_ROOMS_URL = `${SERVER_URL + BASE_URL}`

export const getRoomById = async (id: string) => await get(`/${id}`)

export const GET_ROOM_BY_ID_URL = `${SERVER_URL + BASE_URL}/`

export const leaveRoom = async (roomId: string, userId: string) => await leave({roomId, userId}, "/room")